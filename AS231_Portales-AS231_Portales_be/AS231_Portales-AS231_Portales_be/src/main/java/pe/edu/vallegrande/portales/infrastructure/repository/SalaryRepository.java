package pe.edu.vallegrande.portales.infrastructure.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import pe.edu.vallegrande.portales.domain.model.Salary;
import reactor.core.publisher.Flux;

public interface SalaryRepository extends ReactiveMongoRepository<Salary, String> {
    Flux<Salary> findByWorkerId(String workerId);
}