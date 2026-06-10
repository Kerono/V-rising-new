FROM node:22-alpine3.18 as base 
WORKDIR /node
COPY package*.json ./ 
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

FROM base as dev
ENV NODE_ENV=development
WORKDIR /node
RUN npm install 
RUN apk add --no-cache curl
WORKDIR /node/app
COPY . .
RUN npm run build
CMD ["npm","run","dev"]

FROM dev as test
RUN npm run lint
CMD ["npm","run","test"]

FROM node:25-alpine as prod
ENV NODE_ENV=production
WORKDIR /app
COPY --from=dev /node/app/dist /app/dist
COPY package*.json ./ 
RUN npm ci && npm cache clean --force
ENV PORT=3000
CMD ["node", "dist/main"]
