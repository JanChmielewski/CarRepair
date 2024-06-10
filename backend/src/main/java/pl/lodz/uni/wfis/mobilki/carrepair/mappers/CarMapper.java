package pl.lodz.uni.wfis.mobilki.carrepair.mappers;

import org.springframework.stereotype.Component;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.CarDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Car;
import pl.lodz.uni.wfis.mobilki.carrepair.service.CarService;

@Component
public class CarMapper {
    public CarMapper() {
    }

    private CarService carService;

    public CarDTO toDTO(Car car) {
        return new CarDTO(
                car.getBrand(),
                car.getModel(),
            -    car.getYearOfProduction(),
                car.getRegistrationNumber(),
                car.getVin(),
                car.getMileage(),
                car.getEngine()
        );
    }

    public Car toEntity(CarDTO carDTO) {
        Car car = new Car();
        car.setBrand(carDTO.getBrand());
        car.setModel(carDTO.getModel());
        car.setYearOfProduction(carDTO.getYearOfProduction());
        car.setVin(carDTO.getVin());
        car.setRegistrationNumber(carDTO.getRegistrationNumber());
        return car;
    }
}
