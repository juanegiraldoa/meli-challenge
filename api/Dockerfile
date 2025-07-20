FROM docker.io/library/amazoncorretto:23
LABEL Author="dev.juanes"
COPY "build/libs/api.jar" "challenge.jar"
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "challenge.jar"]
