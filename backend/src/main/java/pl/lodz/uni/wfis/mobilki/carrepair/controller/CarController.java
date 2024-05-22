package pl.lodz.uni.wfis.mobilki.carrepair.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.CarDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Car;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Client;
import pl.lodz.uni.wfis.mobilki.carrepair.service.CarService;
import pl.lodz.uni.wfis.mobilki.carrepair.service.ClientService;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CarController {

    private final CarService carService;
    private final ClientService clientService;

    public CarController(CarService carService, ClientService clientService) {
        this.carService = carService;
        this.clientService = clientService;
    }

    /* TODO: Think about separating adding the client to the DB
     *  from adding the car to the DB an f.e choose the client from the list
     */

    @PostMapping("/addCarForRepair/{clientId}")
    public ResponseEntity<?> addCarForRepair(@PathVariable Long clientId, @RequestBody CarDTO carDTO) {
        Client client = clientService.getOwnerOfCar(clientId).orElse(null);

        if (client == null) {
            return ResponseEntity.badRequest().body("Client not found");
        }

        Car carToAdd = carService.addCarForRepair(carDTO, client);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message: ", "Car with id: " + carToAdd.getId()
                + " and which belongs to Client with id: " + client.getClientId()
                + " added to the database");
        response.put("carID", carToAdd);


        return ResponseEntity.ok(response);
    }

    // TODO: Implement when needed
//    @GetMapping("/carsForDashboard")
//    public Map<List<Car>, List<Client>> getCarsForDashboard() {
//        List<Car> carsForDashboard = carService.getCarsInRepair();
//        List<Client> clientsForDashboard = clientService.getClientsForDashboard();
//
//        for (Car car : carsForDashboard) {
//            car.
//        }
//        return new HashMap<>(Map.of(carsForDashboard, clientsForDashboard));
//    }

    @GetMapping("/cars")
    public ResponseEntity<?> getCars() {
        List<Car> cars = carService.getExistingCars();
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message: ", "List of cars retrieved successfully");
        response.put("cars", cars);

        return ResponseEntity.ok(response);
    }



}
