# Use the official Node.js image
FROM node:16.14.0

# Create and change to the app directory
WORKDIR /app
COPY . /app
RUN npm install
# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
