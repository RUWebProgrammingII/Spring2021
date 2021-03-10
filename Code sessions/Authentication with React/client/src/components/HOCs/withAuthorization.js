import React from 'react';
import { getUserInfo } from '../../services/userService';

// Usage: withAuthorization(DashboardView);
const withAuthorization = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      user: {},
      isHidden: true
    }
    async componentDidMount() {
      const user = await getUserInfo();
      if (!user || Object.keys(user).length === 0) {
        // Redirect user if he is authenticated
        this.props.history.push('/');
      } else {
        this.setState({ user, isHidden: false })
      }
    }
    render() {
      const { user, isHidden } = this.state;
      const renderTemplate = isHidden ? <></> : <WrappedComponent userInfo={user} {...this.props} />;
      return renderTemplate;
    }
  }
}

export default withAuthorization;
