import { IUser } from "./GetUsers.interface";
import { IGame } from "./GetGames.interface";

export interface IStream {
  game_id: string;
  id: string;
  language: string;
  started_at: string;
  tag_ids: string[];
  thumbnail_url: string;
  title: string;
  type: string;
  user_id: string;
  user_name: string;
  viewer_count: string;
};

export interface IStreamsResponse {
  data: IStream[];
  pagination: {
    cursor: string | null;
  };
};

export interface IRecommandedStream extends IStream {
  truePic?: IUser["profile_image_url"];
  gameName?: IGame["name"];
  login?: IUser["login"];
}