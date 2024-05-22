package pl.lodz.uni.wfis.mobilki.carrepair.service;

import org.springframework.stereotype.Service;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.CarDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Car;
import pl.lodz.uni.wfis.mobilki.carrepair.model.CarStatus;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Client;
import pl.lodz.uni.wfis.mobilki.carrepair.repository.CarRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public List<Car> getCarsInRepair() {
        List<Car> carsForDashboard = new ArrayList<>();
        carRepository.findByStatus(CarStatus.IN_REPAIR).ifPresent(carsForDashboard::add);
        carRepository.findByStatus(CarStatus.WAITING_FOR_DIAGNOSIS).ifPresent(carsForDashboard::add);
        carRepository.findByStatus(CarStatus.READY_TO_PICK_UP).ifPresent(carsForDashboard::add);
        carRepository.findByStatus(CarStatus.WAITING_FOR_PARTS).ifPresent(carsForDashboard::add);
        return carsForDashboard;
    }

    public Car addCarForRepair(CarDTO carDTO, Client client) {
        Car car = new Car(
                carDTO.getBrand(),
                carDTO.getModel(),
                carDTO.getYearOfProduction(),
                carDTO.getRegistrationNumber(),
                carDTO.getVin(),
                carDTO.getMileage(),
                carDTO.getEngine(),
                CarStatus.WAITING_FOR_DIAGNOSIS,
                client
        );

        return carRepository.save(car);
    }

    public List<Car> getExistingCars() {
        return carRepository.findAll();
    }

    public void deleteAllCars() {
        carRepository.deleteAll();
    }

    // TODO : Implement when needed
}
