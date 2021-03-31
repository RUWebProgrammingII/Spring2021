import './styles.scss';

const User = ({ user }) => (
  <div className="user" style={{ backgroundImage: `url(${user.avatar})` }}></div>
);

export default User;