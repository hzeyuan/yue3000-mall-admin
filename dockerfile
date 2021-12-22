FROM node:14.17.4 as build


WORKDIR /singleMallAdmin

COPY ./package.json ./

RUN npm install cnpm
RUN cnpm install

COPY . .
RUN cnpm run build


FROM nginx

COPY /singleMallAdmin/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /singleMallAdmin/dist /usr/share/nginx/html