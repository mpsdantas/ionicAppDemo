import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MoovieProvider {
  private baseApiPath = "https://api.themoviedb.org/3";

  constructor(public http: Http) {
    console.log('Hello MoovieProvider Provider');
  }

  getLatestMovies(){
      return this.http.get(this.baseApiPath + "/movie/latest?api_key="+this.getApiKey());
  }

  getApiKey():string{
      return `2b59edfa4f2d17882dc7c937f61d8fbd`;
  }
  
}