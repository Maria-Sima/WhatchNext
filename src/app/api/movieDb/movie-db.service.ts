import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {searchUrl} from "./movieDbConfig";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MovieDBService {
  private apiKey = environment.tmdb_token;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });
  }

  getDetails(title: string): Observable<any> {
    const options = { headers: this.getHeaders() };

    return this.http.get(searchUrl(title), options).pipe(
      catchError(error => {
        console.error('Error while fetching details:', error);
        return throwError('Something went wrong while fetching details.');
      })
    );
  }
}
