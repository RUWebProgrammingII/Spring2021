import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { connectSocket } from '../../redux/actions/socketActions';
import './styles.scss';
import avatarPng from '../../resources/main-avatar.png';
import Button from '../../components/Button';

const WelcomeView = ({ history }) => {
  const dispatch = useDispatch();
  const session = useSelector(({ session }) => session);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (Object.keys(session).length > 0) {
      history.push('/dashboard');
    }
  }, [session]);

  const onChooseAvatarURL = avatar => {
    dispatch(connectSocket({ avatar }));
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