package pe.edu.vallegrande.portales.domain.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;

@Data
@Document(collection = "payments")
public class Payment {
    @Id
    private String id;
    @Field("worker_id")
    private String workerId; // Reference to Worker
    private LocalDate paymentDate;
    private Double amount;
    private Boolean active;
}