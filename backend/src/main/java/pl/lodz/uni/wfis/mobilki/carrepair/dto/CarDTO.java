package pl.lodz.uni.wfis.mobilki.carrepair.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarDTO {

        private Long id;
        private String brand;
        private String model;
        private int yearOfProduction;
        private String registrationNumber;
        private String vin;
        private String mileage;
        private String engine;
}
