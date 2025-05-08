FROM node:23 as build

WORKDIR /app
COPY package*.json ./
RUN npm install -g ember-cli && npm install
COPY . .

ARG APP_ENV=development
ENV APP_ENV=${ENVIRONMENT}

RUN if [ "$APP_ENV" = "production" ]; then ember build --environment=production; fi

FROM nginx:alpine as runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]

FROM node:23 as dev
WORKDIR /app
COPY --from=build /app /app
RUN npm install -g ember-cli
EXPOSE 4200
CMD ["ember", "serve", "--host", "0.0.0.0"]