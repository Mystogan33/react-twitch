import React, { useState, useEffect } from 'react';

import './Sidebar.css';
import api from '../../Api';
import { IStreamsResponse, Stream } from '../../interfaces/GetStreams.interface';
import { IGamesResponse, IGame } from '../../interfaces/GetGames.interface';
import { IUsersResponse, IUser } from '../../interfaces/GetUsers.interface';
import Spinner from '../Spinner/Spinner';

interface IRecommandedStream extends Stream {
  truePic: IUser["profile_image_url"];
  gameName: IGame["name"];
  login: IUser["login"];
}

const Sidebar = () => {

  const [topStreams, setTopStreams] = useState<IRecommandedStream[]>([]);
  const [pagination, setPagination] = useState<IStreamsResponse["pagination"]>({ cursor: null });
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      const resultData = await (await api.get<IStreamsResponse>("https://api.twitch.tv/helix/streams")).data;
      const { data: streams, pagination } = resultData;

      let gameIDs = streams.map(stream => stream.game_id);
      let userIDs = streams.map(stream => stream.user_id);

      let baseUrlGames = "https://api.twitch.tv/helix/games?";
      let baseUrlUsers = "https://api.twitch.tv/helix/users?";

      let queryParamsGame = "";
      let queryParamsUsers = "";

      gameIDs.map(gameId => queryParamsGame += `id=${gameId}&`);
      userIDs.map(userId => queryParamsUsers += `id=${userId}&`);

      let urlFinalGames = baseUrlGames + queryParamsGame;
      let urlFinalUsers = baseUrlUsers + queryParamsUsers;

      let foundGames = (await api.get<IGamesResponse>(urlFinalGames)).data;
      let foundUsers = (await api.get<IUsersResponse>(urlFinalUsers)).data;

      let finalArray = streams.map(stream => {
        
        let newStream: IRecommandedStream = {
          ...stream,
          truePic: "",
          gameName: "",
          login: ""
        };

        foundGames.data.forEach(game => {
          foundUsers.data.forEach(user => {
            if(newStream.user_id === user.id && newStream.game_id === game.id) {
              newStream.truePic = user.profile_image_url;
              newStream.gameName = game.name;
              newStream.login = user.login;
            }
          });
        });

        setIsFetching(false);
        return newStream;
      });

      setTopStreams(finalArray.slice(0,10));
      setPagination(pagination);
    };

    fetchData();
  }, []);

  return (
    <div className="sidebar--container">
      <h2 className="sidebar--title">Chaînes recommandées</h2>
      <ul className="sidebar--streamList">
        { isFetching
          ? <Spinner />
          : (
            topStreams.map((stream, index) => (
              <li key={index} className="sidebar--streamer--container">
                <img src={stream.truePic} alt="streamer logo" className="sidebar--streamer__picture" />
                <div className="sidebar--streamer__username">{stream.user_name}</div>
                <div className="sidebar--steamer__viewerCount">
                  <div className="sidebar--streamer__redDot" />
                  <div>{stream.viewer_count}</div>
                </div>
                <div className="sidebar--streamer__game__name">{stream.gameName}</div>
              </li>
            ))
          )
        }
      </ul>
    </div>
  );
};

export default Sidebar;