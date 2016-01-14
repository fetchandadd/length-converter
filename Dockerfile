FROM nginx

MAINTAINER Tim Tegeler <tim@tegeler.me>

# EDIT NGINX CONFIG
RUN sed -i "s/\/usr\/share\/nginx\/html;/\/usr\/share\/nginx\/html\/app;/" /etc/nginx/conf.d/default.conf

# APT-GET AND NPM
RUN apt-get update
RUN apt-get install --yes curl
RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes git
RUN npm install -g bower

# COPY DIRECTORY AND INSTALLING DEPENDENCIES
COPY . /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
RUN bower install --allow-root

EXPOSE 80
