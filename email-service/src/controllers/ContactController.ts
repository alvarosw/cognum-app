import { Contact } from '@prisma/client';
import { GET, POST, route } from 'awilix-express';
import { Request, Response } from 'express';
import ContactService from '../services/ContactService';
import CacheService from '../services/CacheService';

@route('/contacts')
export default class ContactController {
  contactService: ContactService;
  cacheService: CacheService;
  constructor(contactService: ContactService, cacheService: CacheService) {
    this.contactService = contactService;
    this.cacheService = cacheService;
  }

  @POST()
  @route('/webhook')
  async saveFromWebhook(req: Request, res: Response) {
    console.info(`start ${ContactController.name}.${this.saveFromWebhook.name} method`);

    try {
      const body: Contact | Contact[] = req.body;
      if (Array.isArray(body)) {
        const contacts: Omit<Contact, 'id'>[] =
          body.map(({ name, email }) => ({ name, email }));

        await this.contactService.batchSaveContact(contacts);
      } else {
        const { name, email } = body;
        await this.contactService.saveContact({ name, email });
      }

      return res.status(201).send();
    } catch (error) {
      console.error('Error saving contact from webhook:', error);
      return res.status(500).send();
    } finally {
      console.info(`end ${ContactController.name}.${this.saveFromWebhook.name} method`);
    }
  }

  @GET()
  async list(_: Request, res: Response) {
    try {
      return res.status(200).send(await this.getContactsHandleCache());
    } catch (error) {
      console.error(error);
      return res.status(500).send('Something went wrong. Please try again later.');
    }
  }

  private async getContactsHandleCache() {
    const cacheKey = 'contact:all';
    const resultFromCache = await this.cacheService.get<Contact[]>(cacheKey);
    if (resultFromCache) {
      console.info(`cache HIT for ${cacheKey}`);

      return resultFromCache;
    } else {
      console.info(`cache MISS for ${cacheKey}`);

      const resultFromDb = await this.contactService.listContacts();
      await this.cacheService.set<Contact[]>(cacheKey, resultFromDb);

      return resultFromDb;
    }
  }
}