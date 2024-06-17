package pl.lodz.uni.wfis.mobilki.carrepair.mappers;

import org.springframework.stereotype.Component;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.CarPartsDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.model.CarParts;

@Component
public class CarPartsMapper {

    public CarPartsDTO toDTO(CarParts carParts) {
        return new CarPartsDTO(
                carParts.getId(),
                carParts.getName(),
                carParts.getPartNum(),
                carParts.getPrice(),
                carParts.getQuantity(),
                carParts.getDescription(),
                carParts.getCarModel(),
                carParts.getCategory()
        );
    }

    public CarParts toEntity(CarPartsDTO carPartsDTO) {
        CarParts carParts = new CarParts();
        carParts.setId(carPartsDTO.getId());
        carParts.setName(carPartsDTO.getName());
        carParts.setPartNum(carPartsDTO.getPartNum());
        carParts.setPrice(carPartsDTO.getPrice());
        carParts.setQuantity(carPartsDTO.getQuantity());
        carParts.setDescription(carPartsDTO.getDescription());
        carParts.setCarModel(carPartsDTO.getCarModel());
        carParts.setCategory(carPartsDTO.getCategory());
        return carParts;
    }
}