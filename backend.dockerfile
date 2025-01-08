FROM node:18-slim

WORKDIR /home/reactor

COPY src /home/reactor/src
COPY tsconfig.json /home/reactor/
COPY drizzle.config.ts /home/reactor/
COPY package.json /home/reactor/
COPY yarn.lock /home/reactor/

RUN mkdir /home/reactor/data
RUN mkdir /home/reactor/uploads

RUN yarn install --frozen-lockfile --network-timeout 600000
RUN yarn build

CMD ["yarn", "start"]