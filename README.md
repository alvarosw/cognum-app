# Cognum App

Cognum App, a project developed as a technical test for Cognum Company.

## Overview

The Cognum App is a backend application that consists of a main API and a microservice for sending emails. This README provides instructions on how to set up and run the application locally.

## Getting Started

Follow these steps to get the Cognum App up and running on your local machine:

1. Clone the project repository to your local machine:

   ```shell
   git clone https://github.com/alvarosw/cognum-app.git
   ```

2. Navigate to the project directory:

   ```shell
   cd cognum-app
   ```

3. Run the application using Docker Compose:

   ```shell
   docker-compose up -d
   ```

   The `-d` flag runs the containers in the background.

4. Access the Cognum API in your client at [http://localhost:3000](http://localhost:3000).

5. Access the Email Service in your client at [http://localhost:3333](http://localhost:3333).

6. Access the Prometheus Dashboard in your client at [http://localhost:9090](http://localhost:9090).

## Dependencies

The following technologies are used in this project:

- Docker: Containerization and deployment
- Express: HTTP Server middleware framework
- Awilix: Dependency injection
- MongoDB: NoSQL database
- NGINX: Load balancer gateway
- Prometheus: App Metrics monitoring
- Redis: Caching

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions or need further assistance, feel free to contact us at [alvarossmiguel@gmail.com](mailto:alvarossmiguel@gmail.com).

Happy coding!
