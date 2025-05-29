# Use official Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files and install deps first (layer caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the app source code
COPY . .

# Create a non-root user and switch to it
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose the port
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
