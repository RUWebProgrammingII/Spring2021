import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './styles.scss';
import Navigation from '../../components/Navigation';
import Users from '../../components/Users';

const DashboardView = () => {
  const socket = useSelector(({ socket }) => socket);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Get the initial users list
    socket.emit('users');

    socket.on('users', users => setUsers(users));
    socket.on('connected_user', user => setUsers(users => [...users, user]));
    socket.on('disconnected_user', userID => setUsers(users => users.filter(u => u.userID !== userID)));

    return () => {
      socket.off('users');
      socket.off('connected_user');
      socket.off('disconnected_user');
    };
  }, []);

  return (
    <div className="dashboard">
      <Navigation />
      <Users users={users} />
    </div>
  );
}

export default DashboardView;