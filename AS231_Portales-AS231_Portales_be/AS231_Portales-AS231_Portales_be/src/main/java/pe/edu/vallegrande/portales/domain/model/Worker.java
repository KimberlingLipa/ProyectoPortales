package pe.edu.vallegrande.portales.domain.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "workers")
public class Worker {
    @Id
    private String id; // Using String for MongoDB ObjectId
    private String name;
    private String position;
    private String department;
    private Boolean active; // Adding active flag for consistency with your Sentiment model
}