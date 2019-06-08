FROM node:12.3.1

RUN npm install -g @nestjs/cli

# WORKDIR /usr/
WORKDIR /usr/app/

COPY package.json ./

COPY . ./

# # Install the packages
RUN npm install
RUN npm audit fix --force

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

