import {Component, Input, OnInit} from '@angular/core';
import {IRecomandation} from "../../../data/IRecomandation";

@Component({
  selector: 'app-recommandation-card',
  templateUrl: './recommandation-card.component.html',
  styleUrls: ['./recommandation-card.component.css']
})
export class RecommandationCardComponent implements OnInit{


  @Input() recommendation!: IRecomandation;


  data: any;
  error: any;

  ngOnInit() {
    this.getRecommendationInfo();
  }

  async getRecommendationInfo() {
    try {
      console.log(this.recommendation.title)
      const response = await fetch('http://localhost:3000/api/getMediaDetails', {
        method: 'POST',
        body: JSON.stringify({ title: this.recommendation?.title }),
        headers: {
          'content-type': 'application/json',
        },
      });
      this.data = await response.json();
      console.log(this.data)
    } catch (error) {
      this.error = error;
    }
  }
}
