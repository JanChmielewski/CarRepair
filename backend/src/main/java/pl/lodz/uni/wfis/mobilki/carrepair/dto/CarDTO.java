package pl.lodz.uni.wfis.mobilki.carrepair.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.lodz.uni.wfis.mobilki.carrepair.model.CarStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarDTO {

    private String brand;
    private String model;
    private int yearOfProduction;
    private String registrationNumber;
    private String vin;
    private String mileage;
    private String engine;
    private CarStatus status;
}
