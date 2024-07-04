package pl.lodz.uni.wfis.mobilki.carrepair.request.repairRequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.DateFormat;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EditRepairInfoRequest {
    private Long repairId;
    private LocalDateTime
            dateOfAdmission,
            dateOFHandingOver;
    private String
            infoFromClient,
            infoFromWorker;

    private DateFormat updateDate;
}
