# KubeKanvas Blog Frontend

A modern Next.js TypeScript blog application that connects to a Strapi CMS backend using GraphQL. Features a professional design with Tailwind CSS and modern UI components.

> **⚠️ Educational Use Only**: This project is experimental and created for educational purposes. Users may copy and use it at their own risk. It has not been thoroughly tested for production environments.

## Features

- 🎨 **Modern Design**: Professional UI with gradient backgrounds, glassmorphism effects, and smooth animations
- 🔌 **GraphQL Integration**: Connects to Strapi backend using GraphQL for efficient data fetching
- 🚀 **Static Generation**: Next.js ISR (Incremental Static Regeneration) for optimal performance
- 🎯 **TypeScript**: Full type safety and modern development experience
- 🎨 **Tailwind CSS**: Utility-first CSS framework with custom design system

## Tech Stack

- **Framework**: Next.js 14.0.0
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 4.1.10 with plugins
- **GraphQL**: graphql-request 6.1.0
- **UI Components**: Custom React components with modern design patterns

## Project Structure

```
blog-frontend/
├── components/
│   ├── BlogCard.tsx      # Blog post preview cards with modern styling
│   └── Layout.tsx        # Site layout with sticky header and footer
├── lib/
│   └── strapi.ts         # GraphQL client and API functions
├── pages/
│   ├── _app.tsx          # Next.js app component
│   ├── index.tsx         # Homepage with hero section and blog grid
│   └── blog/
│       └── [slug].tsx    # Individual blog post pages
├── styles/
│   ├── globals.css       # Tailwind CSS imports and custom styles
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── Dockerfile            # Container configuration
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-instance.com
NEXT_PUBLIC_STRAPI_TOKEN=your-strapi-api-token
```

Example for local development:
```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_TOKEN=your-local-strapi-token
```

## Quick Start

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment**:
```bash
cp .env.example .env
# Edit .env with your Strapi URL and token
```

3. **Start development server**:
```bash
npm run dev
```

4. **Open in browser**: [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Strapi Backend Requirements

This frontend expects a Strapi backend with the following GraphQL schema:

### Articles Collection
- `documentId` (String) - Unique document identifier
- `title` (String) - Article title
- `description` (String) - Article description/content
- `slug` (String) - URL-friendly identifier
- `publishedAt` (DateTime) - Publication date
- `createdAt` (DateTime) - Creation timestamp
- `updatedAt` (DateTime) - Last update timestamp

### GraphQL Endpoint
- **URL**: `{STRAPI_URL}/graphql`
- **Authentication**: Bearer token in Authorization header
- **Query Type**: `articles_connection` with `nodes` structure

## Docker Deployment

### Build Image
```bash
docker build -t kubekanvas-blog-frontend .
```

### Run Container
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_STRAPI_URL=https://your-strapi-instance.com \
  -e NEXT_PUBLIC_STRAPI_TOKEN=your-token \
  kubekanvas-blog-frontend
```

## Contributing

This is an educational project. Feel free to fork and modify for your own learning purposes.

## License

This project is for educational purposes only. Use at your own risk.

## Disclaimer

This application is experimental and not thoroughly tested for production use. It is created solely for educational purposes to demonstrate modern web development practices with Next.js, TypeScript, Tailwind CSS, and GraphQL integration with Strapi CMS.
