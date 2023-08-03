FROM openjdk:17-jdk-slim-buster AS builder
WORKDIR /app
COPY . .
RUN ./gradlew build -i --stacktrace
CMD ["./gradlew", "bootRun"]
