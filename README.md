# Cognum App

Cognum App, a project developed as a technical test for Cognum Company.

## Overview

The Cognum App is a backend application that consists of a main API and a microservice for sending emails. This README provides instructions on how to set up and run the application locally.

## Getting Started

Follow these steps to get the Cognum App up and running on your local machine:

1. Clone the project repository to your local machine:

   ```shell
   git clone https://github.com/your-username/cognum-app.git
   ```

2. Navigate to the project directory:

   ```shell
   cd cognum-app
   ```

3. Enter the `./api` directory:

   ```shell
   cd api
   ```

4. Copy the `.env.example` file as `.env`. Use the appropriate command for your operating system:

   - For Linux/macOS:

     ```shell
     cp .env.example .env
     ```

   - For Windows (Command Prompt):

     ```shell
     copy .env.example .env
     ```

   - For Windows (PowerShell):

     ```shell
     Copy-Item .env.example .env
     ```

5. Return to the project root directory:

   ```shell
   cd ..
   ```

6. Enter the `./email-service` directory:

   ```shell
   cd email-service
   ```

7. Copy the `.env.example` file as `.env` using the appropriate command for your operating system:

   - For Linux/macOS:

     ```shell
     cp .env.example .env
     ```

   - For Windows (Command Prompt):

     ```shell
     copy .env.example .env
     ```

   - For Windows (PowerShell):

     ```shell
     Copy-Item .env.example .env
     ```

8. Return to the project root directory:

   ```shell
   cd ..
   ```

9. Run the application using Docker Compose:

   ```shell
   docker-compose up -d
   ```

   The `-d` flag runs the containers in the background.

10. Access the Cognum API in your client at [http://localhost:3000/api](http://localhost:3000/api).

11. Access the Email Service in your client at [http://localhost:3333](http://localhost:3333).

12. Access the Prometheus Dashboard in your client at [http://localhost:9090](http://localhost:9090).

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
