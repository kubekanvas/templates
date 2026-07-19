# Stage 1: Install dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package management files
COPY package.json package-lock.json* ./
RUN npm install

# Stage 2: Rebuild the source code
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

# Copy everything from local context (ensuring your new migrations folder comes along)
COPY . .

# Set flags to bypass telemetry and notify payload to use the mock db layer
ENV NEXT_TELEMETRY_DISABLED=1
ENV IS_DOCKER_BUILD=true
RUN mkdir -p src/app/\(payload\)/cms
RUN npx payload generate:importmap
ENV PAYLOAD_SECRET=BUILD_PHASE_DUMMY_SECRET


RUN npm run build

# Stage 3: Production runner image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy Next.js standalone build (Your migrations are already bundled inside here!)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]