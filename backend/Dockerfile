FROM openjdk:8-jre-alpine

VOLUME /tmp
COPY ./build/libs/dashboard-*jar app.jar

VOLUME /application.yaml

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app.jar"]
