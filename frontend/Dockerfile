# Build stage
FROM node:18-alpine AS build  
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Set working directory and copy build files
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .

# Change ownership to nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html

# Use the nginx user explicitly
USER nginx

# Expose port 80 and run Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
