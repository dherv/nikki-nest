import { Controller, Body, Post } from '@nestjs/common';
import { TranslationServiceClient } from '@google-cloud/translate';

@Controller('translate')
export class TranslateController {
  @Post()
  async translateText(@Body() body): Promise<any> {
    // Instantiates a client
    const translationClient = new TranslationServiceClient({
      keyFilename: './google_credentials.json',
    });

    let { sourceLanguageCode, targetLanguageCode } = body;
    const { text } = body;

    sourceLanguageCode = sourceLanguageCode.slice(0, 2);
    targetLanguageCode = targetLanguageCode.slice(0, 2);
    // Construct request
    const request = {
      parent: `projects/nikki-1578793478545`,
      contents: [text],
      mimeType: 'text/plain', // mime types: text/plain, text/html
      sourceLanguageCode,
      targetLanguageCode,
    };

    try {
      // Run request
      const [response] = await translationClient.translateText(request);
      const translation = response.translations[0].translatedText;
      return Promise.resolve({ translation });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
