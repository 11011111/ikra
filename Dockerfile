FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn global add @quasar/cli
RUN yarn
COPY . .
RUN quasar b --publish

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
