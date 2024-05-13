package pl.lodz.uni.wfis.mobilki.carrepair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    // TODO: implement when needed
}
