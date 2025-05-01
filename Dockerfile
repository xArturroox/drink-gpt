FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the pre-built application JAR from the build context
# Assumes the JAR is located in backend/target/
COPY backend/target/drink-gpt-*.jar /app/app.jar

# Expose the application port
EXPOSE 8080

# Define the entry point for running the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"] 