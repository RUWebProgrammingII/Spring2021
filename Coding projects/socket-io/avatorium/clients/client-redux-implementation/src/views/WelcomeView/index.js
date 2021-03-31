import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSession } from '../../actions/sessionActions';
import './styles.scss';
import avatarPng from '../../resources/main-avatar.png';
import Button from '../../components/Button';

const WelcomeView = ({ history }) => {
  const socket = useSelector(({ socket }) => socket);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    socket.on('session', session => {
      dispatch(addSession(session));
      history.push('/dashboard');
    });

    return () => {
      socket.off('session');
    };
  }, []);

  const onChooseAvatarURL = avatarURL => {
    socket.auth = { avatar: avatarURL };
    socket.connect();
  }

  return (
    <div className="welcome-view-container container">
      <div className="default-avatar" style={{
        backgroundImage: `url('${avatarPng}')`
      }}></div>
      <div className="input-container">
        <label htmlFor="avatar">Choose your avatar</label>
        <input
          autoFocus
          id="avatar"
          name="avatar"
          type="text"
          placeholder="Enter your avatar URL..."
          value={avatar}
          onChange={e => setAvatar(e.target.value)} />
        <Button onClick={() => onChooseAvatarURL(avatar)} style={{ float: 'right', marginTop: 10 }}>Select</Button>
      </div>
    </div>
  )
};

export default WelcomeView;