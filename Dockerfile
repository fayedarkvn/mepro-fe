FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install
COPY ./ /app
RUN yarn run build
FROM nginx:1.21.6-alpine
COPY --from=build-stage /app/dist/ /var/www
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]