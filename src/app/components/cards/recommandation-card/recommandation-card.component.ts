import {Component, Input, OnInit} from '@angular/core';
import {IRecomandation} from "../../../data/IRecomandation";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-recommandation-card',
  templateUrl: './recommandation-card.component.html',
  styleUrls: ['./recommandation-card.component.css']
})
export class RecommandationCardComponent implements OnInit{


  @Input() recommendation!: IRecomandation;


  data: any;
  error: any;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getRecommendationInfo();
  }

  async getRecommendationInfo() {
    try {
      console.log(this.recommendation.title+' '+typeof this.recommendation)
      const url = 'http://localhost:3000/api/getMediaDetails';
      const response = await this.http.post(url, { title: this.recommendation?.title }).subscribe(
        next: this.data=
      )
      this.data = await response.json();
      console.log(this.data)
    } catch (error) {
      this.error = error;
    }
  }
}
