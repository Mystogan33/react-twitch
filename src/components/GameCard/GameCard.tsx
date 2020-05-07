import React from 'react';
import { IGame } from '../../interfaces/GetGames.interface';

import './GameCard.css';
import { Link } from 'react-router-dom';

interface GameCardProps {
  game: IGame;
};

const GameCard = ({ game }: GameCardProps) => (
  <div className="games--card">
    <img src={game.box_art_url} alt="game_image" className="games--card__images"/>
    <div className="games--card__body">
      <h5 className="games--card__body__title">{game.name}</h5>
      <Link className="link" to={{ pathname: `game/${game.name}`, state: { gameID: game.id } }}>
        <div className="games--card__body__btn">Regarder {game.name}</div>
      </Link>
    </div>
  </div>
);

export default GameCard;