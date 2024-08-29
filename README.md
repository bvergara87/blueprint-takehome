# Bluprint Health Takehome Exercise

https://blueprint-takehome.vercel.app/

We are tasked with 2 objectives:

- 1. Create an API endpoint that accepts a set of answers from a diagnostic screener and returns an array of Level-2 Assessments if needed
- 2. Create an application designed to serve mental health screenings. It allows users to complete diagnostic questionnaires and submit their responses for review by healthcare providers.

My solution is a Next.js-based web application hosted on Vercel. The application is designed to be highly available and performant. It is secure and allows for easy troubleshooting.

## Features

- Dynamic loading of screener questionnaires
- Multi-section questionnaires with progress tracking
- Responsive design for various devices
- Secure submission of user responses

## Project Structure

- `src/app`: Contains the main application code
  - `screeners/[id]`: Dynamic route for individual screeners
  - `api`: API routes for handling data
- `lib`: Utility functions and shared code
- `public`: Static assets

## Technologies Used

- Next.js 13 with App Router
- Vercel for hosting
- Postgres
- React
- Chakra UI for styling
- Prisma for database operations

## Technical Choices

For this project, I chose Next.js 13 with App Router for its:

1. Serverless capabilities for efficient scaling
2. Intuitive routing with App Router
3. Full-stack integration
4. Built-in performance optimizations
5. Strong TypeScript support

PostgreSQL was selected as the database for its:

1. Robust relational model
2. ACID compliance
3. Scalability
4. Compatibility with Blueprint's infrastructure

Prisma was chosen as the ORM tool due to:

1. Type-safe database queries
2. Auto-generated migrations
3. Intuitive API
4. User-friendly visual interface (Prisma Studio)

(This is my stack of choice as of late due to the speed of development and the ease of use)

## How would I deploy this as a true production app on the platform of my choice?

Despite my preference for serverless, I would choose a more traditional stack with React on the frontend, and Nest.js for the backend for scale. Presumably, we would be working with hundreds of thousands of patients and providers, each with the potential to generate a large amount of data (Survey data, activity data, Personal Identifiable Information, etc). Given that, I would choose a more traditional stack with a containerized approach to ensure scalability and maintainability. Also I haven't quite figured out to fix the typing issues with Next.js and Vercel yet when testing the API endpoints with Jest, something that wouldn't be an issue with a more traditional framework.

To deploy this as a true production app at enterprise scale, I would choose a cloud platform like AWS or Google Cloud Platform.

1. Containerization:

   - Containerize the application using Docker.
   - Create separate containers for the frontend, backend, and any other services.

2. CI/CD Pipeline:

   - Implement a robust CI/CD pipeline using tools like GitHub Actions.
   - Automate testing, building, and deployment processes.
   - Add unit tests, integration tests, and end-to-end tests on API endpoints and UI components.

3. Database:

   - Use a managed database service like Amazon RDS or Google Cloud SQL for Postgres.
   - Implement read replicas and automatic backups for high availability.

4. Caching:

   - Implement a caching layer using Redis to improve performance of data that doesn't change often and is pulled repeatedly.

5. CDN:

   - Use a Content Delivery Network (CDN) like Cloudflare or AWS CloudFront to serve static assets globally.

6. Monitoring and Logging:

   - Set up comprehensive monitoring using tools like Sentry.

7. Security:

   - Add token based authentication and authorization using tools like Auth0 or Okta.
   - Make sure to scrub/anonymize any PII before storing data.
   - Implement WAF (Web Application Firewall) for protection against common web exploits.
   - Use secrets management tools like AWS Secrets Manager or HashiCorp Vault.

8. Disaster Recovery:
   - Set up regular backups and a disaster recovery plan.
   - Implement multi-region deployment for increased resilience.

This approach would ensure high availability, scalability, and maintainability of the application in a production environment.

## Trade-offs

In this project, I chose to leverage Next.js and Vercel for their excellent developer experience and ability to showcase my skills effectively. This decision allowed me to create a (somewhat) clean, efficient codebase that's easily comprehensible to other developers.

However, I'm aware of the trade-offs involved in selecting a serverless framework. While Vercel claims to offer scalability, there are potential limitations compared to more traditional setups like Nest.js or Express backends, particularly in terms of feature-set (WebSockets, background workers, etc.), modularity and scalability at enterprise levels.

For this demonstration, I prioritized rapid development and simplicity. As the project wasn't intended for large-scale deployment, I concentrated on implementing core functionalities and creating an intuitive UI. This approach meant omitting several features that would be crucial in a real-world scenario, such as:

1. User Authentication
2. Patient Portal for History
3. Provider Portal
4. Comprehensive Typing Library
5. Added security middleware
   etc.

Additionally, I didn't implement the full suite of production-level tools, styling best practices, or robust deployment strategies that I would typically use in a production environment. These decisions were made consciously to balance showcasing my skills with maintaining a manageable scope for the project. Again to reiterate, I haven't quite figured out to fix the typing issues with Next.js and Vercel yet when testing the API endpoints with Jest (I did not write a ton of unit tests on my side projects, but I'm a big proponent of TDD) if I spent more time I would figure that out or simply implement a CI/CD pipeline with a more traditional framework.

In a real-world scenario, I would adopt a more comprehensive approach, incorporating these additional features and utilizing enterprise-grade tools to ensure scalability, security, and maintainability. The current implementation serves as a foundation that can be expanded upon to meet the demands of a full-scale, production-ready application.

## Links

- [MyLessonPal](https://github.com/bvergara87/MyLessonPal)
- [LinkedIn/Resume](https://www.linkedin.com/in/bryant-vergara/)
