import React from 'react';
import GameDealItem from '../GameDealItem';

const GameStore = ({ store }) => {
  const { storeName, images, deals } = store;
  return (
    <div className="game-store">
      <div className="game-store-info">
        <img src={ `https://www.cheapshark.com${images.logo}` } alt=""/>
        <h1>{storeName}</h1>
      </div>
      <div className="game-store-deals">
        { deals.map(d => <GameDealItem key={d.dealID} deal={d} />) }
      </div>
    </div>
  );
}

export default GameStore;
