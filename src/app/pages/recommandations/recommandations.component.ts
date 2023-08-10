import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recomandation} from "../../api/data/recomandation";
import { animateScroll as scroll } from 'react-scroll';
import {firstValueFrom, lastValueFrom} from "rxjs";
import {OpenAiService} from "../../api/openai/open-ai-service";

@Component({
  selector: 'app-recommandations',
  templateUrl: './recommandations.component.html',
  styleUrls: ['./recommandations.component.css']
})
export class RecommandationsComponent {
  cinemaType: string = 'tv show';
  selectedCategories: string[]=[] ;
  specificDescriptors: string = '';
  loading: boolean = false;
  endStream: boolean = false;
  searchResponse: string = '';
  error: string = '';
  recommendations: Array<Recomandation> = [];

  constructor(private http: HttpClient,private openaiService: OpenAiService) { }
  hasFinishedLoading(recommendation: any): boolean {

    return typeof recommendation !== 'string' && recommendation.title;

  }
  async search() {

    if (this.loading) return;
    this.recommendations = [];
    this.searchResponse = '';
    this.loading = true;
    this.error = '';
    console.log('Here   '+this.specificDescriptors)
    let fullSearchCriteria = `Give me a list of 5 ${this.cinemaType} recommendations ${
      this.selectedCategories ? `that fit all of the following categories: ${this.selectedCategories}` : ''
    }. ${
      this.specificDescriptors
        ? `Make sure it fits the following description as well: ${this.specificDescriptors}.`
        : ''
    } ${
      this.selectedCategories || this.specificDescriptors
        ? `If you do not have 5 recommendations that fit these criteria perfectly, do your best to suggest other ${this.cinemaType}'s that I might like.`
        : ''
    } Please return this response as a numbered list with the ${this.cinemaType}'s title, followed by a colon, and then a brief description of the ${this.cinemaType}. There should be a line of whitespace between each item in the list.`;
    try {
      console.log(fullSearchCriteria);
      const response = await this.openaiService.getRecomandations(fullSearchCriteria);

      if (response) {
        const x = response.split('\n');
        const validRecommendations: Recomandation[] = [];

        for (const d of x) {
          const match = d.match(/\d\.\s*(.*?):\s*(.*)/);
          if (match) {
            const title = match[1];
            const description = match[2];
            const recommendation: Recomandation = { title, description };
            validRecommendations.push(recommendation);
          }
        }

        const lastLength = this.recommendations.length;
        this.recommendations = [...this.recommendations, ...validRecommendations];

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
