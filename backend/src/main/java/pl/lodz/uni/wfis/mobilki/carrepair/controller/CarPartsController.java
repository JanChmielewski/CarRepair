package pl.lodz.uni.wfis.mobilki.carrepair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.CarPartsDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.mappers.CarPartsMapper;
import pl.lodz.uni.wfis.mobilki.carrepair.model.CarParts;
import pl.lodz.uni.wfis.mobilki.carrepair.service.CarPartsService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/carparts")
public class CarPartsController {

    @Autowired
    private CarPartsService carPartsService;

    @Autowired
    private CarPartsMapper carPartsMapper;

    @GetMapping
    public List<CarPartsDTO> getAllCarParts() {
        return carPartsService.getAllCarParts()
                .stream()
                .map(carPartsMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarPartsDTO> getCarPartById(@PathVariable Long id) {
        return carPartsService.getCarPartById(id)
                .map(carPartsMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public CarPartsDTO addCarPart(@RequestBody CarPartsDTO carPartsDTO) {
        CarParts carParts = carPartsMapper.toEntity(carPartsDTO);
        return carPartsMapper.toDTO(carPartsService.addCarPart(carParts));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarPartsDTO> updateCarPart(@PathVariable Long id, @RequestBody CarPartsDTO carPartsDTO) {
        try {
            CarParts carParts = carPartsMapper.toEntity(carPartsDTO);
            CarParts updatedCarPart = carPartsService.updateCarPart(id, carParts);
            return ResponseEntity.ok(carPartsMapper.toDTO(updatedCarPart));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCarPart(@PathVariable Long id) {
        carPartsService.deleteCarPart(id);
        return ResponseEntity.noContent().build();
    }
}
