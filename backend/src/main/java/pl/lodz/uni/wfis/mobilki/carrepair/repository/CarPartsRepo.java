package pl.lodz.uni.wfis.mobilki.carrepair.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.lodz.uni.wfis.mobilki.carrepair.model.CarParts;

@Repository
public interface CarPartsRepo extends JpaRepository<CarParts, Long> {
}