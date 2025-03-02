# Use an official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all other files into the container
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the application
CMD ["node", "app.js"]
