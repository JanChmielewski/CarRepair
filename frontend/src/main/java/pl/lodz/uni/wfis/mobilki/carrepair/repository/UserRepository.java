package pl.lodz.uni.wfis.mobilki.carrepair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.lodz.uni.wfis.mobilki.carrepair.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByWorkerCode(String workerCode);
}
