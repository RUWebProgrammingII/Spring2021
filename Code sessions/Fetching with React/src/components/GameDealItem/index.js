import React from 'react';

const GameDealItem = ({ deal }) => {
  const { thumb, normalPrice, salePrice, title, dealID } = deal;
  return (
    <a href={`https://www.cheapshark.com/redirect?dealID=${dealID}`} className="game-deal-item">
      <div className="thumbnail" style={{ backgroundImage: `url(${thumb})` }}></div>
      <div className="title">{title}</div>
      <div className="price">{normalPrice}</div>
      <div className="sale-price">{salePrice}</div>
    </a>
  )
};

export default GameDealItem;
