# Use a base image with Nix
FROM nixos/nix:2.15.0

# Set working directory
WORKDIR /app

# Clone the repository
RUN git clone --branch develop https://github.com/medusajs/b2b-starter-medusa.git .

WORKDIR /app/backend

# Copy .env file into the image
COPY .env /app/backend/.env

# Update to latest Nixpkgs and install Node.js 20
RUN nix-channel --add https://nixos.org/channels/nixos-unstable nixpkgs && \
    nix-channel --update && \
    nix-env -iA nixpkgs.nodejs nixpkgs.corepack

# Enable Corepack and prepare Yarn 4.5.1
RUN corepack enable && corepack prepare yarn@4.5.1 --activate

# RUN yarn add sharp

# Install dependencies
RUN yarn install

RUN yarn install && yarn medusa db:create && yarn medusa db:migrate && yarn run seed && yarn medusa user -e am-it@outlook.com -p @nhads0nI -i admin

# RUN rm -rf .next

# Build the application
RUN yarn build

# Expose the application port

# Start the application
yarn start
