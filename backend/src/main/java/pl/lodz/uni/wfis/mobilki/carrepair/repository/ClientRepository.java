package pl.lodz.uni.wfis.mobilki.carrepair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    // TODO: implement when needed
}
