package pe.edu.vallegrande.portales.application.service;

import org.springframework.stereotype.Service;
import pe.edu.vallegrande.portales.domain.model.Worker;
import pe.edu.vallegrande.portales.infrastructure.repository.WorkerRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class WorkerService {

    private final WorkerRepository workerRepository;

    public WorkerService(WorkerRepository workerRepository) {
        this.workerRepository = workerRepository;
    }

    public Mono<Worker> save(Worker worker) {
        worker.setActive(true); // Default active status for new workers
        return workerRepository.save(worker);
    }

    public Mono<Worker> findById(String id) {
        return workerRepository.findById(id);
    }

    public Flux<Worker> findAll() {
        return workerRepository.findAll();
    }

    public Flux<Worker> findAllActive() {
        return workerRepository.findAll()
                .filter(Worker::getActive); // Only return active workers
    }

    public Flux<Worker> findAllDeactivated() {
        return workerRepository.findAll()
                .filter(worker -> !worker.getActive()); // Only return deactivated workers
    }

    public Mono<Worker> update(String id, Worker worker) {
        return workerRepository.findById(id)
                .flatMap(existing -> {
                    existing.setName(worker.getName());
                    existing.setPosition(worker.getPosition());
                    existing.setDepartment(worker.getDepartment());
                    return workerRepository.save(existing);
                })
                .switchIfEmpty(Mono.error(new RuntimeException("Worker not found")));
    }

    public Mono<Worker> deactivate(String id) {
        return workerRepository.findById(id)
                .flatMap(worker -> {
                    worker.setActive(false); // Deactivate worker
                    return workerRepository.save(worker);
                })
                .switchIfEmpty(Mono.error(new RuntimeException("Worker not found")));
    }

    public Mono<Worker> restore(String id) {
        return workerRepository.findById(id)
                .flatMap(worker -> {
                    worker.setActive(true); // Restore worker
                    return workerRepository.save(worker);
                })
                .switchIfEmpty(Mono.error(new RuntimeException("Worker not found")));
    }
}
