package pl.lodz.uni.wfis.mobilki.carrepair.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.CarDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.exceptions.ResourceNotFoundException;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Car;
import pl.lodz.uni.wfis.mobilki.carrepair.model.CarStatus;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Client;
import pl.lodz.uni.wfis.mobilki.carrepair.repository.CarRepository;
import pl.lodz.uni.wfis.mobilki.carrepair.repository.ClientRepository;
import pl.lodz.uni.wfis.mobilki.carrepair.request.carRequests.EditCarInfoRequest;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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
        carsForDashboard.addAll(carRepository.findByStatus(CarStatus.IN_REPAIR));
        carsForDashboard.addAll(carRepository.findByStatus(CarStatus.WAITING_FOR_DIAGNOSIS));
        carsForDashboard.addAll(carRepository.findByStatus(CarStatus.READY_TO_PICK_UP));
        carsForDashboard.addAll(carRepository.findByStatus(CarStatus.WAITING_FOR_PARTS));
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

    public Map<String, Object> editCarInfo(EditCarInfoRequest editCarInfoRequest, Long carID) {
        Car car = carRepository.findById(carID)
                .orElseThrow(() -> new ResourceNotFoundException("Car", "id", carID));

        Map<String, Object> updatedFields = new LinkedHashMap<>();

        if (editCarInfoRequest.getBrand() != null) {
            car.setBrand(editCarInfoRequest.getBrand());
            updatedFields.put("brand", editCarInfoRequest.getBrand());
        }
        if (editCarInfoRequest.getModel() != null) {
            car.setModel(editCarInfoRequest.getModel());
            updatedFields.put("model", editCarInfoRequest.getModel());
        }
        if (editCarInfoRequest.getYearOfProduction() != null) {
            car.setYearOfProduction(Integer.parseInt(editCarInfoRequest.getYearOfProduction()));
            updatedFields.put("yearOfProduction", editCarInfoRequest.getYearOfProduction());
        }
        if (editCarInfoRequest.getRegistrationNumber() != null) {
            car.setRegistrationNumber(editCarInfoRequest.getRegistrationNumber());
            updatedFields.put("registrationNumber", editCarInfoRequest.getRegistrationNumber());
        }
        if (editCarInfoRequest.getVin() != null) {
            car.setVin(editCarInfoRequest.getVin());
            updatedFields.put("vin", editCarInfoRequest.getVin());
        }
        if (editCarInfoRequest.getMileage() != null) {
            car.setMileage(editCarInfoRequest.getMileage());
            updatedFields.put("mileage", editCarInfoRequest.getMileage());
        }
        if (editCarInfoRequest.getEngine() != null) {
            car.setEngine(editCarInfoRequest.getEngine());
            updatedFields.put("engine", editCarInfoRequest.getEngine());
        }
        if (editCarInfoRequest.getStatus() != null) {
            car.setStatus(editCarInfoRequest.getStatus());
            updatedFields.put("status", editCarInfoRequest.getStatus());
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime updateDate = LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES);
        car.setLastUpdated(updateDate);
        updatedFields.put("lastUpdated", updateDate.format(formatter));

        carRepository.save(car);
        return updatedFields;
    }

    public void deleteCar(Long carID) {
        carRepository.deleteById(carID);
    }
}
