import {Injectable} from "@angular/core";
import {Configuration, OpenAIApi} from "openai";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class OpenAiService {
  configuration = new Configuration({
    apiKey: "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"
  });

  private openai: OpenAIApi;

  constructor() {
    this.openai = new OpenAIApi(this.configuration);
  }

  async getRecomandations(prompt: string): Promise<string | undefined> {
    console.log(environment.openAiKey)
    return this.openai.createCompletion({
      model: "text-davinci-003", prompt: prompt, max_tokens: 256, temperature: 0.7
    }).then(response => {
      return response.data.choices[0].text;
    }).catch(error => {
      return '';
    });
  }
}
