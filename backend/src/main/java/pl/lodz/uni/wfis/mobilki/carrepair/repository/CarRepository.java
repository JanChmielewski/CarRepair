package pl.lodz.uni.wfis.mobilki.carrepair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Car;
import pl.lodz.uni.wfis.mobilki.carrepair.model.CarStatus;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    Optional<Car> findByStatus(CarStatus status);
    List<Car> findByVin(String vin);
    void deleteAll();
}
