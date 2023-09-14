import axios, { AxiosInstance } from 'axios';
import { InternalServerError } from '../utils/HttpExceptions';

interface RawUser {
  name: {
    title: string,
    first: string,
    last: string,
  },
  email: string;
}

export default class UserApiService {
  apiInstance: AxiosInstance;

  constructor() {
    this.apiInstance = axios.create({ baseURL: 'https://randomuser.me/api/' });
  }

  async fetchUsers(quantity = 10) {
    try {
      const { data } = await this.apiInstance.get('', {
        params: {
          results: quantity,
          inc: 'name,email'
        }
      });

      const results: RawUser[] = data.results;
      return results.map(user => ({
        name: `${user.name.first} ${user.name.last}`,
        email: user.email
      }));
    } catch (_) {
      throw new InternalServerError('Error trying to fetch user API. Please contact the administrator.');
    }
  }
}