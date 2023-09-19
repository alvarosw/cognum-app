import { NextFunction, Request, Response } from 'express';
import * as promClient from 'prom-client';

const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

const httpRequestDurationHistogram = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

export default (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on('finish', () => {
    console.log('finishou');
    const end = Date.now();
    const elapsed = end - start;

    const labels = {
      method: req.method,
      route: req.originalUrl,
      status_code: res.statusCode,
    };

    httpRequestCounter.labels(labels).inc();
    httpRequestDurationHistogram.labels(labels).observe(elapsed);
  });

  next();
};

export const metricsHandler = async (_: Request, res: Response) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
};
