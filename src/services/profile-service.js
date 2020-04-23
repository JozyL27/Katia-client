import config from '../config';
import TokenService from './token-service';

const ProfileService = {
  getProfile(userId) {
    return fetch(`${config.API_ENDPOINT}/user/${userId}`)
      .then(res => {
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      });
  },

  getMatches(userId) {
    return fetch(`${config.API_ENDPOINT}/user/${userId}/matches`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      });
  }
};

export default ProfileService;