# Mental Health Screener Application

This is a Next.js-based web application designed to provide mental health screenings. It allows users to complete diagnostic questionnaires and submit their responses for review by healthcare providers.

## Features

- Dynamic loading of screener questionnaires
- Multi-section questionnaires with progress tracking
- Responsive design for various devices
- Secure submission of user responses

## Getting Started

To run the development server:

1. Clone the repository:

   ```
   git clone https://github.com/your-username/mental-health-screener.git
   cd mental-health-screener
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up your environment variables:

   - Create a `.env.local` file in the root directory
   - Add necessary environment variables (e.g., database connection string)

4. Run the development server:

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
