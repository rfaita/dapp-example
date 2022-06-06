FROM node:alpine
# Set the /app directory as working directory
WORKDIR /app
# Install ganache-cli globally
ADD entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh && npm install -g ganache-cli
# Set the default command for the image
ENTRYPOINT ./entrypoint.sh
