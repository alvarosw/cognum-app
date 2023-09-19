import { RedisClientType, createClient } from 'redis';

export default class CacheService {
  client: RedisClientType;
  constructor() {
    this.client = createClient({ url: 'redis://redis:6379' });
  }

  private async prepare() {
    if (!this.client.isReady)
      await this.client.connect();
  }

  async get<T>(key: string): Promise<T | null> {
    await this.prepare();
    const result = await this.client.get(key);

    if (result) return JSON.parse(result) as T;
    return null;
  }

  async set<T>(key: string, value: T, ttl = 30) {
    await this.prepare();
    await this.client.set(key, JSON.stringify(value));
    await this.client.expire(key, ttl);
  }
}