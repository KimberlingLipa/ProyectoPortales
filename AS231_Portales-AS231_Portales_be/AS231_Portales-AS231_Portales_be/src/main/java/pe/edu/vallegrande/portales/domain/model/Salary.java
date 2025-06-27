package pe.edu.vallegrande.portales.domain.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document(collection = "salaries")
public class Salary {
    @Id
    private String id;
    @Field("worker_id")
    private String workerId; // Reference to Worker
    private Double baseSalary;
    private Double bonus;
    private Double deductions;
    private Boolean active;
}