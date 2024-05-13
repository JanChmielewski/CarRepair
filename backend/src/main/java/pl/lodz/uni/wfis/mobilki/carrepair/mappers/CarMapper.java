package pl.lodz.uni.wfis.mobilki.carrepair.mappers;

import org.springframework.stereotype.Component;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.CarDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Car;

@Component
public class CarMapper {

    private CarService carService; // TODO: implement this class

    public CarDTO toDTO(Car car) {
        return new CarDTO(car.getId(), car.getBrand(), car.getModel(), car.getYear(), car.getVin(), car.getRegistrationNumber(), car.getOwner());
    }

    public Car toEntity(CarDTO carDTO) {
        Car car = new Car();
        car.setId(carDTO.getId());
        car.setBrand(carDTO.getBrand());
        car.setModel(carDTO.getModel());
        car.setYearOfProduction(carDTO.getYearOfProduction());
        car.setVin(carDTO.getVin());
        car.setRegistrationNumber(carDTO.getRegistrationNumber());
        return car;
    }
}
