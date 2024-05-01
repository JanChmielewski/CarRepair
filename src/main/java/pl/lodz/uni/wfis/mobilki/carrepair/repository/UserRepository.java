package pl.lodz.uni.wfis.mobilki.carrepair.repository;

import org.springframework.data.repository.CrudRepository;
import pl.lodz.uni.wfis.mobilki.carrepair.model.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByWorkerCode(String workerCode);
}
