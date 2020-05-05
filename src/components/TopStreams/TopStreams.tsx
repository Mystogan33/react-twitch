import React, { useState, useEffect, useRef } from 'react';

import './TopStreams.css';
import Spinner from '../Spinner/Spinner';
import StreamCard from '../../StreamCard/StreamCard';
import api from '../../Api';
import { IStreamsResponse, IRecommandedStream } from '../../interfaces/GetStreams.interface';
import { IGamesResponse } from '../../interfaces/GetGames.interface';
import { IUsersResponse } from '../../interfaces/GetUsers.interface';


const TopStreams = () => {
  const [topStreams, setTopStreams] = useState<IRecommandedStream[]>([]);
  const [pagination, setPagination] = useState<string>("");
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const topStreamsMain = useRef<HTMLDivElement>(null);

  const loadData = async (apiUrl: string) => {
    try {
    const resultData = (await api.get<IStreamsResponse>(apiUrl)).data;
    const { data: streams, pagination: apiPagination } = resultData;

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
            newStream.gameName = game.name;
            newStream.truePic = user.profile_image_url;
            newStream.login = user.login;
          }
        });
      });

      let newUrl = newStream.thumbnail_url.replace('{width}', "320").replace('{height}', "180");
      newStream.thumbnail_url = newUrl;
      
      return newStream;
    });

    setTopStreams([...topStreams, ...finalArray]);

    if(apiPagination.cursor) setPagination(apiPagination.cursor);

    } catch(e) {
      console.log(e);
    }
  };

  const fetchData = async() => {
    setIsFetching(true);
    let apiUrl = "https://api.twitch.tv/helix/streams";
    await loadData(apiUrl);
    setIsFetching(false);
  };

  const fetchMoreData = async () => {
    let apiUrl = `https://api.twitch.tv/helix/streams?after=${pagination}`;
    await loadData(apiUrl);
    setIsFetchingMore(false);
  };

  const onScroll = () => {
    const isAtBottom = topStreamsMain.current!.offsetHeight + topStreamsMain.current!.scrollTop < topStreamsMain.current!.scrollHeight;
    if(isAtBottom) return;
    setIsFetchingMore(true);
  };

  useEffect(() => {
    fetchData();
    topStreamsMain!.current!.addEventListener('scroll', onScroll);
    return () => topStreamsMain!.current!.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(isFetchingMore) fetchMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingMore]);

  return (
    <div className="topStreams--main" ref={topStreamsMain}>
      <h1 className="topStreams--title">Streams les plus populaires</h1>
      <div className="topStreams--container">
        { isFetching
          ? <Spinner />
          : topStreams.map((stream, index) => (
              <StreamCard key={index} stream={stream} />
            ))
        }
        { isFetchingMore
          ? <Spinner />
          : null
        }
      </div>
    </div>
  );
};

export default TopStreams;