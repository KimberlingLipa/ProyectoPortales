package pe.edu.vallegrande.portales.infrastructure.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.vallegrande.portales.application.service.PaymentService;
import pe.edu.vallegrande.portales.domain.model.Payment;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public Mono<Payment> createPayment(@RequestBody Payment payment) {
        return paymentService.save(payment);
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Payment>> getPaymentById(@PathVariable String id) {
        return paymentService.findById(id)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("/worker/{workerId}")
    public Flux<Payment> getPaymentsByWorkerId(@PathVariable String workerId) {
        return paymentService.findByWorkerId(workerId);
    }

    @GetMapping
    public Flux<Payment> getAllPayments() {
        return paymentService.findAllActive();
    }

    @GetMapping("/deactivated")
    public Flux<Payment> getAllDeactivatedPayments() {
        return paymentService.findAllDeactivated();
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<Payment>> updatePayment(@PathVariable String id, @RequestBody Payment payment) {
        return paymentService.update(id, payment)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/deactivate")
    public Mono<ResponseEntity<Payment>> deactivatePayment(@PathVariable String id) {
        return paymentService.deactivate(id)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/restore")
    public Mono<ResponseEntity<Payment>> restorePayment(@PathVariable String id) {
        return paymentService.restore(id)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
