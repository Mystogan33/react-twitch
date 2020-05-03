import React from 'react';
import { IGame } from '../../interfaces/GetGames.interface';

import './GameCard.css';

interface GameCardProps {
  game: IGame;
  index: number | string;
};

const GameCard = ({ game, index }: GameCardProps) => {
 
  return (
    <div key={index} className="games--card">
      <img src={game.box_art_url} alt="game_image" className="games--card__images"/>
      <div className="games--card__body">
        <h5 className="games--card__body__title">{game.name}</h5>
        <div className="games--card__body__btn">Regarder {game.name}</div>
      </div>
    </div>
  );
};

export default GameCard;