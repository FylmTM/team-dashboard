FROM node:10.4.1

ENV TOKEN ""

WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY src/ src/

RUN npm install --only=prod --no-audit

CMD ["npm", "start"]
