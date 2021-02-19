import React, { useState, useEffect } from 'react';
import { getGameDeals } from '../../services/gameService';
import GameStore from '../GameStore';
import loadingGif from '../../resources/loading.gif';

const GameDeals = () => {
  const [ gameStores, setGameStores ] = useState({});
  const [ loading, setLoading ] = useState(true);
  useEffect(() => {
    (async () => {
      setGameStores(await getGameDeals());
      setLoading(false);
    })();
  }, []);
  return (
    <div className='game-deals'>
      {
        loading
        ?
        <div className='center'>
          <img src={loadingGif} alt="loading" className="loading"/>
        </div>
        :
        Object.values(gameStores).map(store => (
          <GameStore key={store.storeID} store={store}  />
        ))
      }
    </div>
  );
};

export default GameDeals;
