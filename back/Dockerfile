####### Build stage #######
FROM maven:3.9.14-eclipse-temurin-25 AS builder

WORKDIR /app

# Copy maven configuration first for better cache
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code
COPY src ./src

# Compile and package the app
RUN mvn clean package -DskipTests


###### Run stage #######
FROM eclipse-temurin:25-jdk-alpine

WORKDIR /app

# Create a non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring

# Copy the JAR from the build stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the default Spring Boot port 8080
EXPOSE 8080

# Startup command with JVM optimizations
ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]