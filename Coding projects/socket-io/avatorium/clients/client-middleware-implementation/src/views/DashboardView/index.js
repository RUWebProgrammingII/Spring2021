import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './styles.scss';
import Navigation from '../../components/Navigation';
import Users from '../../components/Users';
import { emitToSocket } from '../../redux/actions/socketActions';

const DashboardView = () => {
  const users = useSelector(({ users }) => users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(emitToSocket('users'));
  }, []);

  return (
    <div className="dashboard">
      <Navigation />
      <Users users={users} />
    </div>
  );
}

export default DashboardView;