import React from 'react';
import './Error.css';

const Error = () => {
  return (
    <div className="error--main">
      <div className="error--container">
        <h4>Pas de résultats. <br /> Vérifiez l'orthographe de votre saisie ou ce streamer n'existe pas.</h4>
      </div>
    </div>
  );
};

export default Error;