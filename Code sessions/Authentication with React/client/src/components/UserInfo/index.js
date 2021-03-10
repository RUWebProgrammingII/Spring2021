import './styles.css';

const UserInfo = ({ userInfo }) => (
  <div className="userInfo">
    <img src={ userInfo.profile } alt="profile" />
    <div>{ userInfo.fullName }</div>
  </div>
);

export default UserInfo;
