import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../Api';
import Spinner from '../Spinner/Spinner';
import { IUsersResponse, IUser } from '../../interfaces/GetUsers.interface';
import ResultsCard from '../ResultsCard/ResultsCard';

import './SearchResults.css';
import Error from '../Error/Error';

const SearchResults = () => {
  const [result, setResult] = useState<any>(true);
  const [streamerInfo, setStreamerInfo] = useState<IUser[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  let { query } = useParams();

  let cleanSearch = query.replace(/ /g, '');

  const loadData = async () => {
    setResult(true);
    const result = await api.get<IUsersResponse>(`https://api.twitch.tv/helix/users?login=${cleanSearch}`);
    
    if(result.data.data.length === 0) {
      setResult(false);
    } else setStreamerInfo(result.data.data);
  };

  useEffect(() => {
    setIsFetching(true);
    loadData();
    setIsFetching(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="searchResults--main">
      { isFetching && result
        ? <Spinner />
        : (
          <div className="searchResults--container">
            <h4>Résultats de recherche :</h4>
            { streamerInfo.map((user, index: number) => (
                <ResultsCard key={index} user={user} />
              ))
            }
          </div>
        )
      }
      { !result ? <Error /> : null }
    </div>
  )
};

export default SearchResults;