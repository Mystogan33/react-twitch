import React, { useState, useEffect } from 'react';
import  ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import { useParams } from 'react-router-dom';

import './Live.css';
import api from '../../Api';
import { IStreamsResponse, IStream } from '../../interfaces/GetStreams.interface';
import { IGamesResponse } from '../../interfaces/GetGames.interface';
import Spinner from '../Spinner/Spinner';


const Live = () => {

  let { slug } = useParams();
  const [infoStream, setInfoStream] = useState<IStream | any>();
  const [infoGame, setInfoGame] = useState<any>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    setIsFetching(true);
    const streamsResponse = await api.get<IStreamsResponse>(`https://api.twitch.tv/helix/streams?user_login=${slug}`);
    const streamsData = streamsResponse.data;

    if(streamsData.data.length === 0) {
      setInfoStream({ title: "Le Streamer est offline !" });
    } else {
      streamsData.data[0].thumbnail_url = streamsData.data[0].thumbnail_url.replace('{width}', "25").replace("{height}", "25");

      let gameID = streamsData.data.map(stream => {
        return stream.game_id;
      });

      const gamesResponse = await api.get<IGamesResponse>(`https://api.twitch.tv/helix/games?id=${gameID}`);
      const gamesData = gamesResponse.data;

      let gameName = gamesData.data.map(gameName => {
        return gameName.name;
      });

      setInfoGame(gameName);
      setInfoStream(streamsData.data[0]);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    fetchData(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="live--main">
      { isFetching
        ? <Spinner />
        : (
            <>
              <ReactTwitchEmbedVideo 
                height="754"
                width="100%"
                channel={slug}
                theme="dark"
                allowfullscreen
              />
              <div className="live--stream--info">
                <div className="live--stream--info__title">{infoStream?.title}</div>
                { infoStream?.title !== "Le Streamer est offline !"
                  ? (
                    <>
                      <div className="live--stream--info__viewers">{infoStream?.viewer_count} viewers</div>
                      <div className="live--stream--info__streamer">
                        <img src={infoStream?.thumbnail_url} alt="_streamer_image" className="live--stream--info__streamer__image" />
                        <span className="live--stream--info__streamer__name">{infoStream?.user_name}, &nbsp; Langue : {infoStream?.language}</span>
                      </div>
                      <div className="live--stream--info__gameName">Joue à {infoGame}</div>
                    </>
                  ) : null
                }
              </div>
            </>
        )
      }
    </div>
  );
};

export default Live;