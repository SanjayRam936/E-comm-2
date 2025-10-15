# Stage 1: Build the application with Maven
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml file
COPY pom.xml ./

# Download dependencies
RUN mvn dependency:go-offline

# Copy the project source
COPY src ./src

# Package the application
RUN mvn package -DskipTests

# Stage 2: Run the application with OpenJDK
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/shopshield-0.0.1-SNAPSHOT.jar ./

# Expose the port the app runs on
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "shopshield-0.0.1-SNAPSHOT.jar"]
