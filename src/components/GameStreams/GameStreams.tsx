import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import api from '../../Api';
import { IStreamsResponse, IRecommandedStream } from '../../interfaces/GetStreams.interface';
import { IUsersResponse } from '../../interfaces/GetUsers.interface';
import Spinner from '../Spinner/Spinner';
import StreamCard from '../../StreamCard/StreamCard';

import './GameStreams.css';

const GameStreams = () => {
  const [streamData, setStreamData] = useState<IRecommandedStream[]>([]);
  const [viewers, setViewers] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const location: any = useLocation();
  let { gameName } = useParams();

  const loadData = async () => {
    if(location && location.state) {
      const streamsResponse = await api.get<IStreamsResponse>(`https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`);
      let {data: streamsData, pagination: apiPagination} = streamsResponse.data;

      let mappedStreams = streamsData.map(stream => {
        let newUrl = stream.thumbnail_url.replace('{width}', "320").replace('{height}', "180");
        stream.thumbnail_url = newUrl;
        return stream;
      });

      let totalViewers = mappedStreams.reduce((acc: number, value) => {
        return acc += +value.viewer_count;
      }, 0);

      let userIDs = mappedStreams.map(stream => {
        return stream.user_id;
      });

      let baseUrl = "https://api.twitch.tv/helix/users?";
      let queryParamsUsers = "";

      userIDs.map(id => (queryParamsUsers += `id=${id}&`));
      let finalUrl = baseUrl + queryParamsUsers;

      let getUsersLogin = await api.get<IUsersResponse>(finalUrl);
      let { data : userLoginArray } = getUsersLogin.data;

      let finalArray = mappedStreams.map(stream => {
       let newStream: IRecommandedStream = stream;
       newStream.login = "";

       userLoginArray.forEach(login => {
        if(stream.user_id === login.id) newStream.login = login.login;
       });

       return newStream;
      });

      setViewers(totalViewers);
      setStreamData(finalArray);
    }
  }; 

  useEffect(() => {
    setIsFetching(true);
    loadData();
    setIsFetching(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      { isFetching
        ? <Spinner />
        : (
          <div className="gameStreams--main">
              <h1 className="gameStreams--title">{gameName}</h1>
              <h3 className="gameStreams--sbTitle">
                <strong className="coloredText">{viewers}</strong> personnes regardent {gameName}
              </h3>
              <div className="gameStreams--container">
                { streamData.map((stream, index) => (
                    <StreamCard key={index} stream={stream} />
                  ))
                }
              </div>
          </div>
        )
      }
    </div>
  );
};

export default GameStreams;