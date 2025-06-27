# Usar una imagen base de OpenJDK
FROM openjdk:17-jdk-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo pom.xml y descargar dependencias
COPY pom.xml .
COPY src ./src

# Instalar Maven
RUN apt-get update && apt-get install -y maven

# Construir la aplicación
RUN mvn clean package -DskipTests

# Exponer el puerto 8081
EXPOSE 8081

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "target/portales-0.0.1-SNAPSHOT.jar"]