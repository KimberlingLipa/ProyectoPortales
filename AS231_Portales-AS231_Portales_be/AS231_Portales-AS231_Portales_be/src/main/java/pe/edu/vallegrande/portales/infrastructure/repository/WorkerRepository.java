package pe.edu.vallegrande.portales.infrastructure.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import pe.edu.vallegrande.portales.domain.model.Worker;

public interface WorkerRepository extends ReactiveMongoRepository<Worker, String> {
}