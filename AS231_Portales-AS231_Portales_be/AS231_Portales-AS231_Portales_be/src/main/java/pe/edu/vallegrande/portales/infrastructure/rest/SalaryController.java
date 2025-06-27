package pe.edu.vallegrande.portales.infrastructure.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.vallegrande.portales.application.service.SalaryService;
import pe.edu.vallegrande.portales.domain.model.Salary;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/salaries")
public class SalaryController {

    private final SalaryService salaryService;

    public SalaryController(SalaryService salaryService) {
        this.salaryService = salaryService;
    }

    @PostMapping
    public Mono<Salary> createSalary(@RequestBody Salary salary) {
        return salaryService.save(salary);
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Salary>> getSalaryById(@PathVariable String id) {
        return salaryService.findById(id)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("/worker/{workerId}")
    public Flux<Salary> getSalariesByWorkerId(@PathVariable String workerId) {
        return salaryService.findByWorkerId(workerId);
    }

    @GetMapping
    public Flux<Salary> getAllSalaries() {
        return salaryService.findAllActive();
    }

    @GetMapping("/deactivated")
    public Flux<Salary> getAllDeactivatedSalaries() {
        return salaryService.findAllDeactivated();
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<Salary>> updateSalary(@PathVariable String id, @RequestBody Salary salary) {
        return salaryService.update(id, salary)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/deactivate")
    public Mono<ResponseEntity<Salary>> deactivateSalary(@PathVariable String id) {
        return salaryService.deactivate(id)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/restore")
    public Mono<ResponseEntity<Salary>> restoreSalary(@PathVariable String id) {
        return salaryService.restore(id)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
