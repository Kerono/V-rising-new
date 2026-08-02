FROM node:22-alpine3.18 as base 
WORKDIR /container
COPY package*.json ./ 
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

FROM base as dev
WORKDIR /container
RUN npm install 
RUN apk add --no-cache curl
WORKDIR /container/app
COPY . .
RUN npm run build
CMD ["npm","run","dev"]

FROM dev as test 
RUN npm run lint
CMD ["npm","run","test"]

FROM node:25-alpine as prod
ENV NODE_ENV=production
WORKDIR /app
COPY --from=dev /container/app/.next /app/.next
COPY package*.json ./
RUN npm ci && npm cache clean --force
CMD ["npm","run","start"]