FROM node:14-alpine

# update packages
RUN apk update
RUN apk add bash

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY ./package*.json ./
COPY ./tsconfig.json ./
# copy source code to /app/src folder
ADD ./src ./src

RUN npm install
RUN npm run compile

EXPOSE 9001
EXPOSE 9002

CMD /bin/bash