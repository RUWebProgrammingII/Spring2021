import UserInfo from '../UserInfo';
import { apiBaseUrl } from '../../appsettings.json';
import './styles.css';

const Navigation = ({ userInfo }) => (
  <nav>
    <UserInfo userInfo={ userInfo } />
    <a href={`${apiBaseUrl}/logout`}>Logout</a>
  </nav>
);

export default Navigation;
