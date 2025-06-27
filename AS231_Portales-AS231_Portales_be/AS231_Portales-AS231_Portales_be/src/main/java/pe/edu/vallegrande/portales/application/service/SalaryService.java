package pe.edu.vallegrande.portales.application.service;

import org.springframework.stereotype.Service;
import pe.edu.vallegrande.portales.domain.model.Salary;
import pe.edu.vallegrande.portales.domain.model.Worker;
import pe.edu.vallegrande.portales.infrastructure.repository.SalaryRepository;
import pe.edu.vallegrande.portales.infrastructure.repository.WorkerRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class SalaryService {

    private final SalaryRepository salaryRepository;
    private final WorkerRepository workerRepository;

    public SalaryService(SalaryRepository salaryRepository, WorkerRepository workerRepository) {
        this.salaryRepository = salaryRepository;
        this.workerRepository = workerRepository;
    }

    public Mono<Salary> save(Salary salary) {
        return workerRepository.findById(salary.getWorkerId())
                .switchIfEmpty(Mono.error(new RuntimeException("Worker not found")))
                .flatMap(worker -> {
                    salary.setActive(true); // Default active status
                    return salaryRepository.save(salary);
                });
    }

    public Mono<Salary> findById(String id) {
        return salaryRepository.findById(id);
    }

    public Flux<Salary> findByWorkerId(String workerId) {
        return workerRepository.findById(workerId)
                .switchIfEmpty(Mono.error(new RuntimeException("Worker not found")))
                .flatMapMany(worker -> salaryRepository.findByWorkerId(workerId));
    }

    public Flux<Salary> findAll() {
        return salaryRepository.findAll();
    }

    public Flux<Salary> findAllActive() {
        return salaryRepository.findAll()
                .filter(Salary::getActive);
    }

    public Flux<Salary> findAllDeactivated() {
        return salaryRepository.findAll()
                .filter(salary -> !salary.getActive()); // Only return deactivated salaries
    }

    public Mono<Salary> update(String id, Salary salary) {
        return salaryRepository.findById(id)
                .flatMap(existing -> workerRepository.findById(salary.getWorkerId())
                        .switchIfEmpty(Mono.error(new RuntimeException("Worker not found")))
                        .flatMap(worker -> {
                            existing.setWorkerId(salary.getWorkerId());
                            existing.setBaseSalary(salary.getBaseSalary());
                            existing.setBonus(salary.getBonus());
                            existing.setDeductions(salary.getDeductions());
                            return salaryRepository.save(existing);
                        }))
                .switchIfEmpty(Mono.error(new RuntimeException("Salary not found")));
    }

    public Mono<Salary> deactivate(String id) {
        return salaryRepository.findById(id)
                .flatMap(salary -> {
                    salary.setActive(false); // Deactivate salary
                    return salaryRepository.save(salary);
                })
                .switchIfEmpty(Mono.error(new RuntimeException("Salary not found")));
    }

    public Mono<Salary> restore(String id) {
        return salaryRepository.findById(id)
                .flatMap(salary -> {
                    salary.setActive(true); // Restore salary
                    return salaryRepository.save(salary);
                })
                .switchIfEmpty(Mono.error(new RuntimeException("Salary not found")));
    }
}
