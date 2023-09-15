export default class EmailService {
  sendEmail(recipients: string[], content: object) {
    console.info(`start ${EmailService.name}.${this.sendEmail.name} method`);

    // logic goes here
    console.debug(`sending email to recipients...`, { recipients, content });

    console.info(`end ${EmailService.name}.${this.sendEmail.name} method`);
  }
}