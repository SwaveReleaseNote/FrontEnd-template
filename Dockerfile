# 1. Using the node image as the base image
FROM node:16-alpine as build

# 3. Set the working directory inside the container
WORKDIR /app

# 4. Copy the package.json and package-lock.json (or pnpm-lock.yaml) to the working directory
COPY package*.json ./

# 2. Install pnpm globally (you can remove this step if you already installed pnpm locally)
RUN npm install -g pnpm

# 5. Install dependencies using pnpm
RUN pnpm install

# 6. Copy the rest of the source code to the container's working directory
COPY . .

# 7. Build your TypeScript code
RUN pnpm build

# Use the official Nginx base image
FROM nginx:latest

# 이전 빌드 단계에서 빌드한 결과물을 /usr/share/nginx/html 으로 복사한다.
COPY --from=build /app/build /usr/share/nginx/html

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Expose the port Nginx will listen on
EXPOSE 3000

# Start Nginx when the container is run
CMD ["nginx", "-g", "daemon off;"]
