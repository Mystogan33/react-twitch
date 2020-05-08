import React from 'react';

import './ResultsCard.css';
import { Link } from 'react-router-dom';
import { IUser } from '../../interfaces/GetUsers.interface';

interface ResultsCardProps {
  user: IUser
};

const ResultsCard = ({ user }: ResultsCardProps) => {
  return (
    <div className="resultsCard">
      <img src={user.profile_image_url} alt="streamer_pic" className="resultsCard--picture" />
      <div className="resultsCard--body">
        <h5 className="resultsCard--body__title">{user.display_name}</h5>
        <div className="resultsCard--body__text">{user.description}</div>
        <Link className="link" to={{ pathname: `/stream/${user.login}` }}>
          <div className="resultsCard--body__btn resultsCard--body__btnResult">Regarder {user.display_name}</div>
        </Link>
      </div>
    </div>
  )
};

export default ResultsCard;