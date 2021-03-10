import React from 'react';
import Navigation from '../../components/Navigation';
import './styles.css';

const DashboardView = ({ userInfo }) => {
  return (
    <>
      <Navigation userInfo={ userInfo } />
      <div className="dashboard">
        Your secret code: IDDQD
      </div>
    </>
  );
}

export default DashboardView;
