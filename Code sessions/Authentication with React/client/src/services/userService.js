import { apiBaseUrl } from '../appsettings.json';

export const getUserInfo = async () => {
  const result = await fetch(`${apiBaseUrl}/user-info`, {
    credentials: 'include'
  });
  if (result.ok) {
    return result.json();
  }
};

export const checkCredentials = async () => {
  // It will return 'true' if successful (200 OK) otherwise 401 Unauthorized
  const result = await fetch(`${apiBaseUrl}/check-credentials`, {
    credentials: 'include'
  });
  return result.ok;
};
