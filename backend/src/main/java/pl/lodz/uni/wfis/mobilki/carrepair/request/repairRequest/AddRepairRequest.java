package pl.lodz.uni.wfis.mobilki.carrepair.request.repairRequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddRepairRequest {
    LocalDateTime
            dateOfAdmission,
            dateOFHandingOver;
    String
            infoFromClient,
            infoFromWorker;

}
