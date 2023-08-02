import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-recommandations',
  templateUrl: './recommandations.component.html',
  styleUrls: ['./recommandations.component.css']
})
export class RecommandationsComponent {
  cinemaType: string = 'tv show';
  selectedCategories: string[] = [];
  specificDescriptors: string = '';
  loading: boolean = false;
  endStream: boolean = false;
  searchResponse: string = '';
  error:string='';
  recommendations: Array<string > = [];
  constructor(private http: HttpClient) { }
  async search() {
    if (this.loading) return;
    this.recommendations = [];
    this.searchResponse = '';
    this.endStream = false;
    this.loading = true;
    this.error='';

    let fullSearchCriteria = `Give me a list of 5 ${this.cinemaType} recommendations ${
      this.selectedCategories.length > 0 ? `that fit all of the following categories: ${this.selectedCategories}` : ''
    }. ${
      this.specificDescriptors ? `Make sure it fits the following description as well: ${this.specificDescriptors}.` : ''
    } ${
      (this.selectedCategories.length > 0 || this.specificDescriptors)
        ? `If you do not have 5 recommendations that fit these criteria perfectly, do your best to suggest other ${
          this.cinemaType
        }'s that I might like.`
        : ''
    } Please return this response as a numbered list with the ${this.cinemaType}'s title, followed by a colon. There should be a line of whitespace between each item in the list.`;

      const response = await this.http.post('/api/getRecommendation', { searched: fullSearchCriteria }).subscribe({
        next:response=>{
          console.log(response)
          this.loading=false;
        },
        error:err => {
          console.error("Errors are the path to the dark side. OpenAi wants you to join ")
        this.error=err
        },
        complete:()=>
      console.log("Did it work? Yes?")
      })

  }

  // async handleSearchResponse(data: ReadableStreamDefaultReader<Uint8Array>) {
  //   const reader = data.getReader();
  //   const decoder = new TextDecoder();
  //   let searchResponse = '';
  //
  //   try {
  //     while (true) {
  //       const { value, done } = await reader.read();
  //       const chunkValue = decoder.decode(value);
  //
  //       searchResponse += chunkValue;
  //
  //       if (done) {
  //         this.endStream = true;
  //         break;
  //       }
  //     }
  //
  //     if (searchResponse) {
  //       let lastLength = this.recommendations.length;
  //       let x = searchResponse.split('\n');
  //       this.recommendations = x.map((d, i) => {
  //         if ((x.length - 1 > i || this.endStream) && d !== '') {
  //           const [ title] = d.match(/\d\.\s*(.*?):\s*(.*)/);
  //           return { title };
  //         } else {
  //           return d;
  //         }
  //       });
  //
  //       if (this.recommendations.length > lastLength) {
  //         animateScroll.scrollToBottom({ duration: 1500 });
  //       }
  //     }
  //   } catch (err) {
  //     this.error = 'Looks like OpenAI timed out :(';
  //   }
  // }

  clearForm() {
    this.recommendations = [];
    this.searchResponse = '';
    this.endStream = false;
    this.cinemaType = 'tv show';
    this.selectedCategories = [];
    this.specificDescriptors = '';
  }

}