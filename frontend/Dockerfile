FROM node:10.1.0

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM httpd:2.4

COPY --from=0 /app/build /usr/local/apache2/htdocs/
