FROM node:23 AS base
WORKDIR /app
COPY package*.json ./
RUN npm install -g ember-cli && npm install
COPY . .

FROM base AS prod
ARG APP_ENV=production
ENV APP_ENV=$APP_ENV
RUN ember build --environment=production

FROM nginx:alpine AS runtime
COPY --from=prod /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]

FROM base AS dev
EXPOSE 4200
CMD ["ember", "serve", "--host", "0.0.0.0"]