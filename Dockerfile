# Use the Node.js version you are currently using
FROM node:20-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package files first to take advantage of Docker caching
COPY package*.json ./

# Install dependencies (production only for a smaller image)
RUN npm install --only=production

# Copy the rest of your application code
COPY . .

# Your app runs on port 5000 (from your config)
EXPOSE 5000

# Start the application
CMD [ "node", "app.js" ]