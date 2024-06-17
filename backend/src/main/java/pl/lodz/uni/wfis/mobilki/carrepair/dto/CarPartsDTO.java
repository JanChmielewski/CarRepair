package pl.lodz.uni.wfis.mobilki.carrepair.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.lodz.uni.wfis.mobilki.carrepair.model.CarPartCategory;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarPartsDTO {
    private Long id;
    private String name;
    private String partNum;
    private double price;
    private int quantity;
    private String description;
    private String carModel;
    private CarPartCategory category;
}