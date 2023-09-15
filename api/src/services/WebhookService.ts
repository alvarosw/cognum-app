import { Employee } from '@prisma/client';
import axios, { AxiosError, AxiosInstance } from 'axios';

type EmployeeContact = Pick<Employee, 'name'> & { email: string; };
export default class WebhookService {
  apiInstance: AxiosInstance;

  constructor() {
    this.apiInstance = axios.create({ baseURL: 'http://localhost:3333/' });
  }

  async postEmployee(data: EmployeeContact | EmployeeContact[]) {
    return this.apiInstance.post('contacts/webhook', data).catch(error => {
      if (error instanceof AxiosError)
        console.error('Error sending postEmployee webhook:', error.message);
      else
        console.error('Error sending postEmployee webhook:', error);
    });
  }
}
