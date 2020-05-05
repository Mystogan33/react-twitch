import React, { useState, useEffect, useRef } from 'react';
import api from '../../Api';

import './Games.css';
import { ITopGamesResponse } from '../../interfaces/GetGames.interface';
import Spinner from '../Spinner/Spinner';
import GameCard from '../GameCard/GameCard';

const Games = () => {

  const [games, setGames] = useState<ITopGamesResponse["data"]>([]);
  const [pagination, setPagination] = useState<string>("");
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const gamesMain = useRef<HTMLDivElement>(null);

  const resizeGames = (gamesToResize: ITopGamesResponse["data"]) => {
    return gamesToResize.map(game => {
      let newUrl = game.box_art_url
            .replace("{width}", "250")
            .replace("{height}", "300");

      game.box_art_url = newUrl;
      return game;
    });
  };

  const loadData = async (apiUrl: string) => {
    try {
      const resultData = await api.get<ITopGamesResponse>(apiUrl);
      const result = resultData.data;
      const { data: topGames, pagination: apiPagination } = result;

      const mappedTopGames = resizeGames(topGames);
      setGames([...games, ...mappedTopGames]);

      if(apiPagination.cursor) {
        setPagination(apiPagination.cursor);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchData = async () => {
    setIsFetching(true);
    let apiUrl = 'https://api.twitch.tv/helix/games/top';
    await loadData(apiUrl);
    setIsFetching(false);
  };

  const fetchMoreData = async () => {
    setIsFetchingMore(true);
    let apiUrl = `https://api.twitch.tv/helix/games/top?after=${pagination}`;
    await loadData(apiUrl);
    setIsFetchingMore(false);
  };

  const onScroll = () => {
    const isAtBottom = gamesMain.current!.offsetHeight + gamesMain.current!.scrollTop < gamesMain.current!.scrollHeight;
    if(isAtBottom) return;
    setIsFetchingMore(true);
  };

  useEffect(() => {
    fetchData();
    gamesMain!.current!.addEventListener('scroll', onScroll);
    return () => gamesMain!.current!.removeEventListener('scroll', onScroll);
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(isFetchingMore) fetchMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingMore]);

  return (
    <div className="games--main" ref={gamesMain}>
      <h1 className="games--title">Jeux les plus populaires</h1>
      <div className="games--container">
        { isFetching
          ? <Spinner />
          : games.map((game, index) => (
              <GameCard key={index} game={game} />
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

export default Games;