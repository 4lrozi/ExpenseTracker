bashCopy code
# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /

# Install the application dependencies
RUN npm install uuid
RUN npm install bcryptjs jsonwebtoken
RUN npm install express mongoose dotenv
RUN npm install nodemon --save-dev
RUN npx nodemon server.js

# Define the entry point for the container
CMD ["npm", "start"]