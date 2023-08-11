import {Component, Input, OnInit} from '@angular/core';
import {Recomandation} from "../../../api/data/recomandation";
import {MovieDBService} from "../../../api/movieDb/movie-db.service";
import {originalImageURL, w500ImageURL} from "../../../api/movieDb/movieDbConfig";
import {data} from "autoprefixer";

@Component({
  selector: 'app-recommandation-card',
  templateUrl: './recommandation-card.component.html',
  styleUrls: ['./recommandation-card.component.css']
})
export class RecommandationCardComponent implements OnInit{


  @Input() recommendation!: Recomandation;


  data: any;
  error: any;
  constructor(private movieApiService: MovieDBService) {}
  ngOnInit() {
    this.getRecommendationInfo();
  }

  async getRecommendationInfo() {

this.movieApiService.getDetails(this.recommendation.title).subscribe({
    next: (details) => {
      this.data = details.results[0];
      console.log(this.data)
    },
    error: (err) => {
      console.error(err);
    }
  }
  )
}

  protected readonly originalImageURL = originalImageURL;
  protected readonly w500ImageURL = w500ImageURL;
}
