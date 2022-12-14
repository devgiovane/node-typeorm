FROM node:18.12-alpine
RUN apk add --no-cache bash
WORKDIR /usr/app
COPY package.json ./
RUN yarn
COPY . .
EXPOSE 3333
CMD [ "yarn", "start" ]
