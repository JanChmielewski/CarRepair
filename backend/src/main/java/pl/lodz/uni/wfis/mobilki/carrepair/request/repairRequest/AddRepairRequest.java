package pl.lodz.uni.wfis.mobilki.carrepair.request.repairRequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Car;
import pl.lodz.uni.wfis.mobilki.carrepair.model.CarStatus;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Repair;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddRepairRequest {
    Repair repair;
    Car car;
    private CarStatus carStatus;
}
