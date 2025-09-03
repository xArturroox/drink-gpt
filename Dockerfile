FROM eclipse-temurin:24-jre-alpine

# Copy the pre-built application JAR from the build context
# Assumes the JAR is located in backend/target/
COPY backend/target/*.jar /app/app.jar

# Expose the application port
EXPOSE 8080

# Define the entry point for running the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"] 