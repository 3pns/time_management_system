# Stage 1 - the build process
FROM node:10.14 as build-deps
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_RECAPTCHA_SITE_KEY
ARG REACT_APP_TOKEN_RENEWAL_DELAY
ENV NODE_PATH src/
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.16.1-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
