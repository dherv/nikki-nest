import { Controller, Post, Body } from '@nestjs/common';
// Imports the Google Cloud client library
import textToSpeech from '@google-cloud/text-to-speech';
// Load the AWS SDK for Node.js
import * as AWS from 'aws-sdk';

@Controller('speech')
export class SpeechController {
  private client: any;
  private s3: any;
  private voices: any;

  constructor() {
    this.client = null;
    this.s3 = null;
    this.voices = null;
    this.init();
  }
  init() {
    // Creates a client
    // Set the region
    AWS.config.update({
      region: 'ap-northeast-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    this.s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    this.client = new textToSpeech.TextToSpeechClient({
      keyFilename: './google_credentials.json',
    });
  }

  uploadToS3(response, text): Promise<any> {
    const params = {
      Bucket: 'nikki.audio',
      Key: `${text.toLowerCase().replace(/ /g, '_')}.mp3`,
      Body: response.audioContent,
    };
    const options = { partSize: 10 * 1024 * 1024, queueSize: 1 };

    return new Promise((resolve, reject) => {
      this.s3.upload(params, options, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  @Post()
  async voice(@Body() body) {
    interface IVoice {
      name: string;
      ssmlGender: string;
      languageCodes: string[];
      naturalSampleRateHertz: number;
    }

    const { text, languageCode, voiceType } = body;

    // Get the list of voices to select the one needed
    const [result] = await this.client.listVoices({});
    const voices: IVoice[] = result.voices;
    const voicesMap: Map<string, IVoice> = new Map([]);

    // filter voices depending on voice type
    // TODO: the voiceMap is not useful if filtering by languageCode. Useful if call extracted and injected to avoid getting voice list on each call.
    voices
      .filter((v: IVoice) => v.languageCodes[0] === languageCode)
      .filter((v: IVoice) => v.ssmlGender === 'FEMALE')
      .filter((v: IVoice) => v.name.indexOf(voiceType) > -1)
      .forEach((v: IVoice) => {
        const code = v.languageCodes[0];
        // remove duplicate codes
        if (!voicesMap.has(code)) {
          voicesMap.set(code, v);
        }
      });

    const voice = voicesMap.get(languageCode);

    // Construct the request
    const request = {
      input: { text },
      voice: {
        languageCode,
        ssmlGender: 'FEMALE',
        name: voice.name,
      },
      // Select the type of audio encoding
      audioConfig: { audioEncoding: 'MP3' },
    };

    return new Promise((resolve, reject) => {
      this.client.synthesizeSpeech(request, (err, response) => {
        if (err) {
          return reject(err);
        }
        return this.uploadToS3(response, text)
          .then(res => {
            return resolve(res);
          })
          .catch(error => reject(error));
      });
    });
  }
}
