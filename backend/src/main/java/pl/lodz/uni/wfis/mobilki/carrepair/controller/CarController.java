package pl.lodz.uni.wfis.mobilki.carrepair.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.CarDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.mappers.CarMapper;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Car;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Client;
import pl.lodz.uni.wfis.mobilki.carrepair.service.CarService;
import pl.lodz.uni.wfis.mobilki.carrepair.service.ClientService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CarController {

    private final CarService carService;
    private final ClientService clientService;


    public CarController(CarService carService, ClientService clientService, CarMapper carMapper) {
        this.carService = carService;
        this.clientService = clientService;
    }

    @PostMapping("/addCarForRepair")
    public Car addCarForRepair(CarDTO carDTO) {
        Client client = new Client(
                carDTO.getClientId(),
                carDTO.getClientName(),
                carDTO.getClientSurname(),
                carDTO.getClientEmail(),
                carDTO.getClientPhoneNumber()
        );

        /* TODO: Think about separating adding the client to the DB
                *  from adding the car to the DB an f.e choose the client from the list
         */
        return carService.addCarForRepair(carDTO, client);
    }


    @GetMapping("/carsForDashboard")
    public Map<List<Car>, List<Client>> getCarsForDashboard() {
        List<Car> carsForDashboard = carService.getCarsInRepair();
        List<Client> clientsForDashboard = clientService.getClientsForDashboard();

        for (Car car : carsForDashboard) {
            car.
        }
        return new HashMap<>(Map.of(carsForDashboard, clientsForDashboard));
    }



}
