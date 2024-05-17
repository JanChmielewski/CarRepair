package pl.lodz.uni.wfis.mobilki.carrepair.dto;
import pl.lodz.uni.wfis.mobilki.carrepair.RepairStatus
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RepairDTO {
    private Long id;
    private String description;
    private RepairStatus status;
    private Date repairDate;
}
