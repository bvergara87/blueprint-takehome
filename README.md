# Bluprint Health Takehome Exercise

Time Spent: ~ 6 hours

Live Site: https://blueprint-takehome.vercel.app/

We are tasked with 2 objectives:

- 1. Create an API endpoint that accepts a set of answers from a diagnostic screener and returns an array of Level-2 Assessments if needed
- 2. Create an application designed to serve mental health screenings. It allows users to complete diagnostic questionnaires and submit their responses for review by healthcare providers.

My solution is a Next.js-based web application hosted on Vercel using Postgres and Prisma. I decided to deploy my solution as a web application for simplicity and felt the scope of the project would be better suited for that.

In the app you can:

- View a list of available screeners
- View a screener questionnaire and answer the questions
- View the summary of your answers and navigate to change answers
- Ping the API to submit your answers and log a set of Level-2 Assessments that can be used to inform treatment plans (Level-2 Assessments are not displayed only logged in the console)

## Project Structure

- `src/app`: Contains the main application code
  - `/`: Home page with list of available screeners
  - `/screeners/[id]`: Dynamic route for individual screeners
  - `/completed`: Acknowledgement page for completed screeners and submission success
  - `/api`: API routes for handling data
- `lib`: Utility functions and shared code
- `types`: Shared Typescript types
- `public`: Static assets

## Technologies Used

- Next.js 14 with App Router
- Vercel for hosting
- Postgres
- React
- Chakra UI for styling
- Prisma for database operations

## Technical Choices

For this project, I chose Next.js 14 with App Router for its:

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

Despite my preference for serverless, I would choose a more traditional stack with React on the frontend, and Nest.js for the backend for scale. Presumably, we would be working with hundreds of thousands of patients and providers, each with the potential to generate a large amount of data (Survey data, activity data, Personal Identifiable Information, etc).

Given that, I would choose a more traditional stack with a containerized approach to ensure scalability and maintainability.

To deploy this as a true production app at enterprise scale, I would deploy on a cloud platform like AWS or Google Cloud Platform with the following approach:

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

   - Implement a caching layer using Redis to improve performance of data that doesn't change often and is pulled repeatedly (e.g. list of available screeners, screener questions, etc).

5. Monitoring and Logging:

   - Set up comprehensive monitoring using tools like Sentry.

6. Security:

   - Add authentication and authorization using tools like Auth0 or Clerk.
   - Make sure to scrub/anonymize any PII before storing data.
   - Use secrets management tools like AWS Secrets Manager or HashiCorp Vault.

7. Disaster Recovery:

   - Set up regular backups and a disaster recovery plan.
   - Implement multi-region deployment for increased resilience.

8. Responsive UI:
   - Implement responsive design for various devices.
   - Remove inline styles and replace proper SCSS styles.

This approach would ensure high availability, scalability, and maintainability of the application in a production environment.

## Trade-offs

In this project, I chose to leverage Next.js and Vercel for the frameworks speed and performance for quick deployment. This decision allowed me to create a (somewhat) clean, efficient codebase that's easily comprehensible to other developers.

However, I'm aware of the trade-offs involved in selecting a serverless framework. There are potential limitations compared to more traditional setups like Nest.js or Express backends, particularly in terms of feature-set (WebSockets, background workers, etc.), modularity and scalability at enterprise levels.

This approach meant omitting several features that I would have liked to add in an extended solution such as:

1. User Authentication
2. Patient Portal for History
3. Provider Portal
4. Comprehensive Typing Library
5. Added security middleware
   etc.

In a real-world scenario, I would adopt a more comprehensive approach, incorporating these additional features and utilizing enterprise-grade tools to ensure scalability, security, and maintainability. The current implementation serves as a foundation that can be expanded upon to meet the demands of a full-scale, production-ready application.

## Notes for Consideration

- The testing suite is not complete, I ran into issues with typing and deployment with Next.js and Vercel, where the build would fail due to dynamic imports that vercel couldn't handle and typescript errors that I wasn't able to resolve in the time I spent on this. (The tests do run locally if I change NextRequest -> NextApiRequest, but obviously on a production app this would be a non-starter and I'd have to rewrite the tests to work with that.)
- I implemented the UI pretty quickly, but I didn't go all out on the styling and therefore used in-line styling to get the job done.
- I didn't implement any authentication, though I would have liked to add some patient identification to the data and add middleware with tokenized authentication (Clerk, auth0, etc) for added security.

## Links

- [MyLessonPal](https://github.com/bvergara87/MyLessonPal)
- [LinkedIn/Resume](https://www.linkedin.com/in/bryant-vergara/)

The vast majority the code I've worked on is in private repositories, but I have no issues with sharing code upon request.
