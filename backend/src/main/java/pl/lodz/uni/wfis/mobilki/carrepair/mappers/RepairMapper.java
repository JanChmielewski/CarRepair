

import org.springframework.stereotype.Component;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.RepairDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Repair;


@Component
public class RepairMapper {

    public RepairDTO toDTO(Repair repair) {
        return new RepairDTO(repair.getId(), repair.getDescription(), repair.getStatus(), repair.getDate());
    }

    public Repair toEntity(RepairDTO repairDTO) {
        Repair repair = new Repair();
        repair.setId(repairDTO.getId());
        repair.setDescription(repairDTO.getDescription());
        repair.setStatus(repairDTO.getStatus());
        repair.setDate(repairDTO.getDate());
        return repair;
    }


}