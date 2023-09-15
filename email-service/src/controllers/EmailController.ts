import joi from 'joi';
import { Request, Response } from 'express';
import { HttpException, UnprocessableEntity } from '../utils/HttpExceptions';
import EmailService from '../services/EmailService';
import { POST, route } from 'awilix-express';
import ContactService from '../services/ContactService';

@route('/email')
export default class EmailController {
  emailService: EmailService;
  contactService: ContactService;
  constructor(emailService: EmailService, contactService: ContactService) {
    this.emailService = emailService;
    this.contactService = contactService;
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

      const contacts = await this.contactService.getContactsByEmails(recipients);
      this.emailService.sendEmail(contacts, content);

      return res.status(200).send({ message: 'E-mails were sent successfully.' });
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException)
        return res.status(error.statusCode).send({ message: error.message });
      return res.status(500).send({ message: 'Something went wrong. Please try again later.' });
    }
  }
}