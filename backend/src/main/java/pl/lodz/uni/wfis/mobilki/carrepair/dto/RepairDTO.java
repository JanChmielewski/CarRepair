package pl.lodz.uni.wfis.mobilki.carrepair.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Car;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RepairDTO {
    private LocalDateTime dateOfAdmission;
    private LocalDateTime dateOFHandingOver;
    private String infoFromClient;
    private String infoFromWorker;
    private String repairedBy;
    private Car car;
}
