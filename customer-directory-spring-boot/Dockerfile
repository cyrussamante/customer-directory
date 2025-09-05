FROM eclipse-temurin:21-jdk AS build
WORKDIR /workspace

COPY . .

RUN chmod +x gradlew

ENV GRADLE_OPTS="-Xmx256m"
RUN ./gradlew clean build --no-daemon

FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /workspace/build/libs/*.jar app.jar

ENV JAVA_TOOL_OPTIONS="-Xmx256m"

EXPOSE 8080
CMD ["sh", "-c", "java -jar app.jar --server.port=$PORT"] 