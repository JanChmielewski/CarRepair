package pl.lodz.uni.wfis.mobilki.carrepair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Client;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    Optional<Client> findById(Long id);
}
