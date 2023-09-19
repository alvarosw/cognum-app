import joi from 'joi';
import { Request, Response } from 'express';
import { HttpException, UnprocessableEntity } from '../utils/HttpExceptions';
import EmailService from '../services/EmailService';
import { POST, route } from 'awilix-express';
import ContactService from '../services/ContactService';
import CacheService from '../services/CacheService';
import { Contact } from '@prisma/client';

@route('/email')
export default class EmailController {
  emailService: EmailService;
  contactService: ContactService;
  cacheService: CacheService;
  constructor(emailService: EmailService, contactService: ContactService, cacheService: CacheService) {
    this.emailService = emailService;
    this.contactService = contactService;
    this.cacheService = cacheService;
  }

  @POST()
  @route('/send-notification')
  async sendEmail(req: Request, res: Response) {
    try {
      const payload = await joi.object({
        recipients: joi.array()
          .items(
            joi.string()
              .email()
          )
          .required()
          .error(new UnprocessableEntity('Property "recipients" should be an array of valid emails.')),
        content: joi.object()
          .required()
          .error(new UnprocessableEntity('Property "content" is required and should be an object.'))
      }).validateAsync(req.body);
      const recipients: string[] = payload.recipients;
      const content: object = payload.content;

      const contacts = await this.getContactsHandleCache(recipients);
      this.emailService.sendEmail(contacts, content);

      return res.status(200).send({ message: 'E-mails were sent successfully.' });
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException)
        return res.status(error.statusCode).send({ message: error.message });
      return res.status(500).send({ message: 'Something went wrong. Please try again later.' });
    }
  }

  private async getContactsHandleCache(emails: string[]) {
    const contactList: Contact[] = [];

    const contactsFromCache = await Promise.all(
      emails.map(email => this.cacheService.get<Contact>(`contact:email:${email}`))
    );

    const foundContacts = contactsFromCache.filter(Boolean);
    contactList.push(...foundContacts as Contact[]);

    const notFoundEmails = emails.filter(email => foundContacts.every(contact => contact?.email !== email));
    if (notFoundEmails) {
      const contactsFromDb = await this.contactService.getContactsByEmails(emails);
      contactList.push(...contactsFromDb);
      await Promise.all(
        contactsFromDb.map(contact => this.cacheService.set<Contact>(`contact:email:${contact.email}`, contact, 300))
      );
    }

    return contactList;
  }
}