import {IOpenAiPayload} from "./IOpenAiPayload";
import { createParser } from 'eventsource-parser';
import axios from "axios";
const dotenv=require("dotenv");
dotenv.config();

const key = "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";
const openAi_url='https://api.openai.com/v1/completions';
const headers={'Content-Type': 'application/json',
  Authorization: `Bearer ${key}`};
async function streamOpenAiCompletions(payload:IOpenAiPayload){
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

const res=await axios.post(openAi_url,payload,{headers});
  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: any) {
        if (event.type === 'event') {
          const data = event.data;

          if (data === '[DONE]') {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].text;

            const queue = encoder.encode(text);
            controller.enqueue(queue);

          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);

      for await (const chunk of res.data as any) {
        parser.feed(decoder.decode(chunk));
      }
    }
  });
  return stream;

}

export async function GetRecomandation({request}:{request:any}){
  const { searchFor } = await request.json();
  const payload={
    model: 'text-davinci-003',
    prompt: searchFor,
    temperature: 0.7,
    max_tokens: 2048,
  }
const stream=await streamOpenAiCompletions(payload);
  return new Response(stream);
}
