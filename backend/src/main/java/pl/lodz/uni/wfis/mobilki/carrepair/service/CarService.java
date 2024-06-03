package pl.lodz.uni.wfis.mobilki.carrepair.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.CarDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Car;
import pl.lodz.uni.wfis.mobilki.carrepair.model.CarStatus;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Client;
import pl.lodz.uni.wfis.mobilki.carrepair.repository.CarRepository;
import pl.lodz.uni.wfis.mobilki.carrepair.repository.ClientRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class CarService {

    private final CarRepository carRepository;
    private final ClientRepository clientRepository;

    public CarService(CarRepository carRepository, ClientRepository clientRepository) {
        this.carRepository = carRepository;
        this.clientRepository = clientRepository;
    }

    public List<Car> getCarsInRepair() {
        List<Car> carsForDashboard = new ArrayList<>();
        carRepository.findByStatus(CarStatus.IN_REPAIR).ifPresent(carsForDashboard::add);
        carRepository.findByStatus(CarStatus.WAITING_FOR_DIAGNOSIS).ifPresent(carsForDashboard::add);
        carRepository.findByStatus(CarStatus.READY_TO_PICK_UP).ifPresent(carsForDashboard::add);
        carRepository.findByStatus(CarStatus.WAITING_FOR_PARTS).ifPresent(carsForDashboard::add);
        return carsForDashboard;
    }

    @Transactional
    public Car addCarForRepair(CarDTO carDTO, Long clientId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Client with id: " + clientId + " not found"));

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

}
