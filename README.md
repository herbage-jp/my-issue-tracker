# Issue Tracker Application

This is an Issue Tracker application built with Next.js 15, based on the [Next.js Projects: Issue Tracker](https://codewithmosh.com/p/nextjs-projects-issue-tracker) course by Mosh Hamedani, with some key modifications.

## Project Overview

This application allows users to create, track, and manage issues in a project management context. It demonstrates the use of modern web development practices with Next.js 15 and integrates with PostgreSQL for data persistence.

## Key Features

- Issue creation and management
- Issue filtering and sorting
- User authentication and authorization
- Dashboard with issue statistics
- Responsive design for all devices

## Technology Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (modified from the original MySQL in the course)
- **ORM**: Prisma
- **Authentication**: NextAuth.js with Google OAuth provider

## Key Modifications from Original Course

1. **Next.js Version**: Using Next.js 15 instead of Next.js 13 used in the original course
2. **Database**: Using PostgreSQL instead of MySQL

## Getting Started

### Prerequisites

- Node.js (version 18.17 or later)
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up your environment variables in `.env` file:

```
DATABASE_URL="postgresql://username:password@localhost:5432/issue_tracker"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. For Google OAuth authentication:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Navigate to "APIs & Services" > "Credentials"
   - Create an OAuth client ID (Application type: Web application)
   - Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
   - Copy the generated Client ID and Client Secret to your `.env` file

5. Run Prisma migrations:

```bash
npx prisma migrate dev
```

6. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `/app` - Next.js App Router pages and components
- `/prisma` - Prisma schema and migrations
- `/public` - Static assets
- `/components` - Reusable UI components

## Testing

Run the tests with:

```bash
npm test -- -v -s
# or
yarn test -- -v -s
```

## Deployment

This application can be deployed on Vercel or any other platform that supports Next.js applications.

## Acknowledgements

- [Mosh Hamedani](https://codewithmosh.com) for the original course and project structure
- [Next.js](https://nextjs.org) for the amazing React framework
- [Prisma](https://prisma.io) for the database ORM
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
