export interface IGame {
  id: string;
  name: string;
  box_art_url: string;
};

export interface ITopGamesResponse extends IGamesResponse {
  pagination: {
    cursor: string | null;
  };
};

export interface IGamesResponse {
  data: IGame[];
};