import {modelDataMatcher} from "@utils/model-utils";

export interface SortModel {
  id: string;
  title: string;
  sortType: string;
  orderType: string;
}

export class Movie {
  public id: string = null;
  public title: string = null;
  public year: string = null;
  public rated: string = null;
  public released: string = null;
  public runtime: string = null;
  public genre: string[] = [];
  public director: string = null;
  public writer: string = null;
  public actors: string = null;
  public plot: string = null;
  public language: string[] = []
  public country: string = null;
  public awards: string = null;
  public poster: string = null;
  public metascore: string = null;
  public imdbRating: string = null;
  public imdbVotes: string = null;
  public imdbID: string = null;
  public type: string = null;
  public response: string = null;
  public images: string[] = [];

  constructor(props: Partial<Movie> = {}) {
    modelDataMatcher(props, this);
  }
}
