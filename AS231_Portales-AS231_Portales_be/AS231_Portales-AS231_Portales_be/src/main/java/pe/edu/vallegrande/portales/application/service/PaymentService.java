package pe.edu.vallegrande.portales.application.service;

import org.springframework.stereotype.Service;
import pe.edu.vallegrande.portales.domain.model.Payment;
import pe.edu.vallegrande.portales.domain.model.Worker;
import pe.edu.vallegrande.portales.infrastructure.repository.PaymentRepository;
import pe.edu.vallegrande.portales.infrastructure.repository.WorkerRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final WorkerRepository workerRepository;

    public PaymentService(PaymentRepository paymentRepository, WorkerRepository workerRepository) {
        this.paymentRepository = paymentRepository;
        this.workerRepository = workerRepository;
    }

    public Mono<Payment> save(Payment payment) {
        return workerRepository.findById(payment.getWorkerId())
                .switchIfEmpty(Mono.error(new RuntimeException("Worker not found")))
                .flatMap(worker -> {
                    payment.setActive(true); // Default active status
                    return paymentRepository.save(payment);
                });
    }

    public Mono<Payment> findById(String id) {
        return paymentRepository.findById(id);
    }

    public Flux<Payment> findByWorkerId(String workerId) {
        return workerRepository.findById(workerId)
                .switchIfEmpty(Mono.error(new RuntimeException("Worker not found")))
                .flatMapMany(worker -> paymentRepository.findByWorkerId(workerId));
    }

    public Flux<Payment> findAll() {
        return paymentRepository.findAll();
    }

    public Flux<Payment> findAllActive() {
        return paymentRepository.findAll()
                .filter(Payment::getActive);
    }

    public Flux<Payment> findAllDeactivated() {
        return paymentRepository.findAll()
                .filter(payment -> !payment.getActive()); // Only return deactivated payments
    }

    public Mono<Payment> update(String id, Payment payment) {
        return paymentRepository.findById(id)
                .flatMap(existing -> workerRepository.findById(payment.getWorkerId())
                        .switchIfEmpty(Mono.error(new RuntimeException("Worker not found")))
                        .flatMap(worker -> {
                            existing.setWorkerId(payment.getWorkerId());
                            existing.setPaymentDate(payment.getPaymentDate());
                            existing.setAmount(payment.getAmount());
                            return paymentRepository.save(existing);
                        }))
                .switchIfEmpty(Mono.error(new RuntimeException("Payment not found")));
    }

    public Mono<Payment> deactivate(String id) {
        return paymentRepository.findById(id)
                .flatMap(payment -> {
                    payment.setActive(false); // Deactivate payment
                    return paymentRepository.save(payment);
                })
                .switchIfEmpty(Mono.error(new RuntimeException("Payment not found")));
    }

    public Mono<Payment> restore(String id) {
        return paymentRepository.findById(id)
                .flatMap(payment -> {
                    payment.setActive(true); // Restore payment
                    return paymentRepository.save(payment);
                })
                .switchIfEmpty(Mono.error(new RuntimeException("Payment not found")));
    }
}
