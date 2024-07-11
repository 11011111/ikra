FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn global add @quasar/cli
RUN yarn
COPY . .
RUN quasar b --publish

FROM nginx:1.25.5-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
