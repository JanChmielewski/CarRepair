package pl.lodz.uni.wfis.mobilki.carrepair.request.carRequests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.DateFormat;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EditCarInfoRequest {
    private Long carId;
    private String
            brand,
            model,
            yearOfProduction,
            registrationNumber,
            vin,
            mileage,
            engine;
    private DateFormat updateDate;

}
