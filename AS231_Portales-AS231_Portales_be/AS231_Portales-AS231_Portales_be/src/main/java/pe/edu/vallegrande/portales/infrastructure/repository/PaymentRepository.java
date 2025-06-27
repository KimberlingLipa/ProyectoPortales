package pe.edu.vallegrande.portales.infrastructure.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import pe.edu.vallegrande.portales.domain.model.Payment;
import reactor.core.publisher.Flux;

public interface PaymentRepository extends ReactiveMongoRepository<Payment, String> {
    Flux<Payment> findByWorkerId(String workerId);
}