# Use the official Node.js 18 image as the base image
FROM node:20.12.2-alpine3.19 AS builder

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Set environment variable for development
ENV NODE_ENV=development
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_SECRET=randomsecurestring
ENV GRAGHBASE_URL=http://localhost:3001/graphql

# Install `wait-for-it` to wait for the external API (if needed)
RUN apk add --no-cache bash

# Start the Next.js app
CMD ["npm", "run", "dev"]