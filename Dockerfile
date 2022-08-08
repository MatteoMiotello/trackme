# Builder
FROM node:16-alpine3.14 AS builder
WORKDIR ./app

# Copy package
ADD package.json yarn.lock ./

# Install dependencies
RUN yarn add rimraf
RUN yarn --frozen-lockfile

COPY . .

# Build
RUN yarn install

CMD [ "npm", "run", "start:dev" ]
