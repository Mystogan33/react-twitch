import React from 'react';
import { IRecommandedStream } from '../interfaces/GetStreams.interface';

import './StreamCard.css';
import { Link } from 'react-router-dom';

interface StreamCardProps {
  stream: IRecommandedStream;
};

const StreamCard = ({ stream }: StreamCardProps) => {
  return (
    <div className="stream--card">
      <img src={stream.thumbnail_url} alt="stream_image" className="stream--card__image"/>
      <div className="stream--card__body">
        <h5 className="stream--card__body__title">{stream.user_name}</h5>
        <p className="stream--card__body__gameName">{stream.gameName}</p>
        <p className="stream--card__body__viewers">{stream.viewer_count} viewers</p>
        <Link className="link" to={{ pathname: `/stream/${stream.login}`}}>
          <div className="stream--card__body__btn">Regarder {stream.user_name}</div>
        </Link>
      </div>
    </div>
  );
};

export default StreamCard;