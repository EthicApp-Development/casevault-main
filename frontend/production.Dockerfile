# Stage 1: Build the Vite project
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and lock file to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install
#RUN npm install -g vite

# Copy the entire project to the container
COPY . .

# Build the project for production
RUN npm run build

# Stage 2: Nginx to serve the Vite build
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /app/assets /usr/share/nginx/html

# Copy custom nginx configuration (optional, if you have one)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
