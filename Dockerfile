ARG BASE_IMAGE=node:lts-alpine
FROM ${BASE_IMAGE}

WORKDIR /usr/src/app

COPY . ./

RUN npm install

ARG PORT=8080
EXPOSE ${PORT}

CMD ["npm", "start"]
