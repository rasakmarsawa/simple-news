FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install 'serve' globally for static hosting
RUN npm install -g serve

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose the runtime port
EXPOSE 3000

# Start production server
CMD ["sh", "-c", "serve -s dist -l ${PORT:-5173}"]
