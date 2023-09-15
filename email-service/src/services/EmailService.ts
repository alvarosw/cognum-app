import { Contact } from '@prisma/client';

export default class EmailService {
  sendEmail(contacts: Contact[], content: object) {
    console.info(`start ${EmailService.name}.${this.sendEmail.name} method`);

    // logic goes here
    console.debug(`sending email to recipients...`, { recipients: contacts, content });

    console.info(`end ${EmailService.name}.${this.sendEmail.name} method`);
  }
}