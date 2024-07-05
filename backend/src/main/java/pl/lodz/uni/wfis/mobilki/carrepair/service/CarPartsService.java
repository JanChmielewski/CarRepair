package pl.lodz.uni.wfis.mobilki.carrepair.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.lodz.uni.wfis.mobilki.carrepair.model.CarParts;
import pl.lodz.uni.wfis.mobilki.carrepair.repository.CarPartsRepo;

import java.util.List;
import java.util.Optional;

@Service
public class CarPartsService {

    @Autowired
    private CarPartsRepo carPartsRepo;

    public List<CarParts> getAllCarParts() {
        return carPartsRepo.findAll();
    }

    public Optional<CarParts> getCarPartById(Long id) {
        return carPartsRepo.findById(id);
    }

    public CarParts addCarPart(CarParts carParts) {
        return carPartsRepo.save(carParts);
    }

    public CarParts updateCarPart(Long id, CarParts updatedCarPart) {
        Optional<CarParts> optionalCarPart = carPartsRepo.findById(id);
        if (optionalCarPart.isPresent()) {
            CarParts existingCarPart = optionalCarPart.get();
            existingCarPart.setName(updatedCarPart.getName());
            existingCarPart.setPartNum(updatedCarPart.getPartNum());
            existingCarPart.setPrice(updatedCarPart.getPrice());
            existingCarPart.setQuantity(updatedCarPart.getQuantity());
            existingCarPart.setDescription(updatedCarPart.getDescription());
            existingCarPart.setCarModel(updatedCarPart.getCarModel());
            existingCarPart.setCategory(updatedCarPart.getCategory());
            return carPartsRepo.save(existingCarPart);
        } else {
            throw new RuntimeException("CarPart with id " + id + " not found.");
        }
    }

    public void deleteCarPart(Long id) {
        carPartsRepo.deleteById(id);
    }
}
