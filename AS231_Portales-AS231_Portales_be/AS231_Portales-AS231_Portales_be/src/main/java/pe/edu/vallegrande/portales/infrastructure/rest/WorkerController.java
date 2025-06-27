package pe.edu.vallegrande.portales.infrastructure.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.vallegrande.portales.application.service.WorkerService;
import pe.edu.vallegrande.portales.domain.model.Worker;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/workers")
public class WorkerController {

    private final WorkerService workerService;

    public WorkerController(WorkerService workerService) {
        this.workerService = workerService;
    }

    @PostMapping
    public Mono<Worker> createWorker(@RequestBody Worker worker) {
        return workerService.save(worker);
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Worker>> getWorkerById(@PathVariable String id) {
        return workerService.findById(id)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping
    public Flux<Worker> getAllWorkers() {
        return workerService.findAllActive();
    }

    @GetMapping("/deactivated")
    public Flux<Worker> getAllDeactivatedWorkers() {
        return workerService.findAllDeactivated();
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<Worker>> updateWorker(@PathVariable String id, @RequestBody Worker worker) {
        return workerService.update(id, worker)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/deactivate")
    public Mono<ResponseEntity<Worker>> deactivateWorker(@PathVariable String id) {
        return workerService.deactivate(id)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/restore")
    public Mono<ResponseEntity<Worker>> restoreWorker(@PathVariable String id) {
        return workerService.restore(id)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
