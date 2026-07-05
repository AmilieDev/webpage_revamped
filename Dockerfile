FROM node:24-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY server/ server/
COPY public/ public/

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "server/index.js"]