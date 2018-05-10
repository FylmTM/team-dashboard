FROM maven:3.5.3-jdk-8-alpine

RUN set -ex && \
  apk add --no-cache \
    openssh \
    git

RUN git clone https://github.com/rcarz/jira-client.git /jira-client
RUN cd /jira-client && git checkout 868a5ca8977e0c13b792aeed7a793d55cea743ec
RUN cd /jira-client && mvn clean install -DskipTests

WORKDIR /app
COPY . .
RUN ./gradlew clean build

FROM openjdk:8-jre-alpine

VOLUME /tmp
COPY --from=0 /app/build/libs/dashboard-*jar app.jar

VOLUME /application.yaml

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app.jar"]
