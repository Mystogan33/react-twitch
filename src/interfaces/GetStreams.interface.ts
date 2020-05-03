export interface Stream {
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
  data: Stream[];
  pagination: {
    cursor: string | null;
  };
};