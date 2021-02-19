import React from 'react';
import GameDeals from './components/GameDeals';
import hero from './resources/deals_hero.png';

const App = () => (
  <>
    <img src={hero} alt='hero' className='hero-banner' />
    <GameDeals />
  </>
);

export default App;
