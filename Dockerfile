FROM node:22-slim AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies including devDependencies for tsc
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Final production stage
FROM node:22-slim AS release

ENV NODE_ENV=production
WORKDIR /app

# Only copy what we need for production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
# In case users want to use .env with Docker
COPY --from=builder /app/.env.example ./.env.example

# Install only production dependencies
RUN npm install --omit=dev

ENTRYPOINT ["node", "dist/index.js"]
