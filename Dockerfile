FROM openjdk:20

ENV ENVIRONMENT=prod

LABEL maintainer="flightchecker"

EXPOSE 8080

ADD backend/target/flightchecker.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar" ]