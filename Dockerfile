FROM openjdk:20

ENV ENVIRONMENT=prod

EXPOSE 8080

ADD backend/target/FlightChecker.jar app.jar

CMD [ "sh","-c", "java -jar /app.jar" ]