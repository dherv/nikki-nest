import { Controller, Get, Body, Post } from '@nestjs/common';
import { TranslationServiceClient } from '@google-cloud/translate';

@Controller('translate')
export class TranslateController {
  @Post()
  async translateText(@Body() body): Promise<any> {
    // Instantiates a client
    const translationClient = new TranslationServiceClient({
      keyFilename: './google_credentials.json',
    });
    const { text, sourceLanguageCode, targetLanguageCode } = body;
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
      for (const translation of response.translations) {
        return Promise.resolve({ translation: translation.translatedText });
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
