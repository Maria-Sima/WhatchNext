import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IRecomandation} from "../../data/IRecomandation";
import { animateScroll as scroll } from 'react-scroll';
import {firstValueFrom, lastValueFrom} from "rxjs";
import {OpenAiService} from "../../service/open-ai-service";

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
  error: string = '';
  recommendations: Array<IRecomandation> = [];

  constructor(private http: HttpClient,private openaiService: OpenAiService) { }

  async search() {
    if (this.loading) return;
    this.recommendations = [];
    this.searchResponse = '';
    this.endStream = false;
    this.loading = true;
    this.error = '';

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

    try {
      console.log(fullSearchCriteria)
      const response = await this.openaiService.getRecomandations(fullSearchCriteria);
      console.log(response)
      if (response) {
        let lastLength = this.recommendations.length;
        let x = response.split('\n');
        this.recommendations = x.map((d, i) => {
          if ((x.length - 1 > i || this.endStream) && d !== '') {
            const match = d.match(/\d\.\s*(.*?):\s*(.*)/);
            if (match) {
              const title = match[1]; // Extract the title from the match array
              const description = match[2];
              const recomandation:IRecomandation={title,description};
              return recomandation;
            } else {
              return { title: '', description: '' } as IRecomandation;
            }
          } else {
            return { title: d, description: '' } as IRecomandation;
          }
        });

        if (this.recommendations.length > lastLength) {
          scroll.scrollToBottom({ duration: 1500 });
        }
      }
    } catch (err) {
      this.error = 'Looks like OpenAI timed out :(';
    }

    this.loading = false;
  }

  clearForm() {
    this.recommendations = [];
    this.searchResponse = '';
    this.endStream = false;
    this.cinemaType = 'tv show';
    this.selectedCategories = [];
    this.specificDescriptors = '';
  }
}
