package pl.lodz.uni.wfis.mobilki.carrepair.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.CarDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Car;
import pl.lodz.uni.wfis.mobilki.carrepair.service.CarService;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CarController {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping("/addCarForRepair/{carID}")
    public ResponseEntity<?> addCarForRepair(@RequestBody CarDTO carDTO, @PathVariable("carID") Long carID) {
        Car carToAdd = carService.addCarForRepair(carDTO, carID);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message: ", "Car with id: " + carToAdd.getId()
                + " which belong to: " + carToAdd.getClient().getName() + " " + carToAdd.getClient().getSurname()
                + " added to the database");
        response.put("carID", carToAdd);

        return ResponseEntity.ok(response);
    }

    // TODO: Implement when needed
    @GetMapping("/carsForDashboard")
    public ResponseEntity<?> getCarsForDashboard() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message: ", "List of cars for dashboard retrieved successfully");
        response.put("cars", carService.getCarsInRepair());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/cars")
    public ResponseEntity<?> getCars() {
        List<Car> cars = carService.getExistingCars();
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message: ", "List of cars retrieved successfully");
        response.put("cars", cars);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/deleteAllCars")
    public ResponseEntity<?> deleteAllCars() {
        carService.deleteAllCars();
        return ResponseEntity.ok("All cars deleted successfully");
    }


}
