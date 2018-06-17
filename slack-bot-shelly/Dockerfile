FROM node:10.4.1

ENV TOKEN ""
ENV KUBECONFIG "/app/kube.conf"

# Setup app
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY src/ src/

RUN npm install --only=prod --no-audit

# Setup kubectl
COPY bin/kubectl /app/bin/kubectl
RUN touch /app/kube.conf
ENV PATH="/app/bin:${PATH}"

# Setup helm
RUN wget https://storage.googleapis.com/kubernetes-helm/helm-v2.8.2-linux-amd64.tar.gz
RUN mv helm-v2.8.2-linux-amd64.tar.gz bin/helm-v2.8.2-linux-amd64.tar.gz
RUN cd bin/ && tar -zxvf helm-v2.8.2-linux-amd64.tar.gz
ENV PATH="/app/bin/linux-amd64:${PATH}"

CMD ["npm", "start"]
