import { Contact, PrismaClient } from '@prisma/client';

export default class ContactService {
  contactRepo;
  constructor(prisma: PrismaClient) {
    this.contactRepo = prisma.contact;
  }

  async saveContact(data: Omit<Contact, 'id'>) {
    return this.contactRepo.create({ data });
  }

  async batchSaveContact(data: Omit<Contact, 'id'>[]) {
    return this.contactRepo.createMany({ data });
  }

  async listContacts() {
    return this.contactRepo.findMany();
  }
}