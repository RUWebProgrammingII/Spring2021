import React from 'react';
import githubLogo from '../../resources/github-logo.png';
import linkedInLogo from '../../resources/linkedin-logo.png';
import { apiBaseUrl } from '../../appsettings.json';
import './styles.css';

const WelcomeView = () => (
  <div className="signin-container">
    <a href={`${apiBaseUrl}/auth/github`}>
      <img src={githubLogo} alt="github signin" />
    </a>
    <a href={`${apiBaseUrl}/auth/linkedin`}>
      <img src={linkedInLogo} alt="linkedin signin" />
    </a>
  </div>
);

export default WelcomeView;
