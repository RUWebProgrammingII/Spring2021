import './styles.scss';
import User from '../User';

const Users = ({ users }) => (
  <div className="users">
    {users.map(u => <User key={u.userID} user={u} />)}
  </div>
);

export default Users;