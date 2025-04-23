# As of time of writing, the below image contains vulnerabilities.
# In production, there would be an approved version available.

# Example React app Dockerfile taken from
# https://www.docker.com/blog/how-to-dockerize-react-app/

FROM node:16-alpine
 
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of application files
COPY . .
 
# Expose the port your app runs on
EXPOSE 3000
 
# Define the command to run your app
CMD ["npm", "start"]