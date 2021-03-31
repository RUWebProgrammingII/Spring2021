import './styles.scss';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const session = useSelector(({session}) => session);
  return (
    <nav className="navigation">
      <div className="avatar" style={{ backgroundImage: `url(${session.avatar})` }}></div>
    </nav>
  );
}

export default Navigation;