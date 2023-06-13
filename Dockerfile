FROM ubuntu:22.04

RUN apt update && apt install -y nodejs npm

WORKDIR /home/nodeapp

RUN npm init -y
RUN npm install express pg ejs
RUN npm install -g pm2 -y

COPY server.js /home/nodeapp
COPY views /home/my-website/nodeapp

EXPOSE 3040

CMD ["pm2-runtime", "start", "server.js"]

