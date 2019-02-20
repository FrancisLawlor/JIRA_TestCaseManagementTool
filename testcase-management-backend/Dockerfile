FROM java:8-jdk-alpine
LABEL maintainer="selitektay@gmail.com"
RUN mkdir checklist-demo
COPY . /checklist-demo/
RUN apk update && apk add bash
WORKDIR /checklist-demo
RUN chmod +x ./gradlew
RUN ./gradlew build
WORKDIR /checklist-demo/build/libs
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "checklist-0.0.1-SNAPSHOT.jar"]
