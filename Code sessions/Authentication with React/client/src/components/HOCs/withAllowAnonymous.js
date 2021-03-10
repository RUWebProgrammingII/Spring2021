import React from 'react';
import { checkCredentials } from '../../services/userService';

// Usage: withAuthorization(DashboardView);
const withAllowAnonymous = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      isHidden: true
    }
    async componentDidMount() {
      if (await checkCredentials()) {
        // He is authenticated
        this.props.history.push('/dashboard');
      } else {
        this.setState({ isHidden: false });
      }
    }
    render() {
      const { isHidden } = this.state;
      const renderTemplate = isHidden ? <></> : <WrappedComponent {...this.props} />;
      return renderTemplate;
    }
  }
}

export default withAllowAnonymous;
