package pl.lodz.uni.wfis.mobilki.carrepair.mappers;

import org.springframework.stereotype.Component;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.RepairDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.model.CarStatus;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Repair;
import pl.lodz.uni.wfis.mobilki.carrepair.service.UserService;

@Component
public class RepairMapper {

    private final UserService userService;
    public RepairMapper(UserService userService) {
        this.userService = userService;
    }

    public RepairDTO toDTO(Repair repair) {
        return new RepairDTO(
                repair.getDateOfAdmission(),
                repair.getDateOFHandingOver(),
                repair.getInfoFromClient(),
                repair.getInfoFromWorker(),
                repair.getStatus().toString(),
                repair.getRepairedBy().getWorkerCode(),
                repair.getCar()
        );
    }

    public Repair toEntity(RepairDTO repairDTO) {
        Repair repair = new Repair();
        repair.setDateOfAdmission(repairDTO.getDateOfAdmission());
        repair.setDateOFHandingOver(repairDTO.getDateOFHandingOver());
        repair.setInfoFromClient(repairDTO.getInfoFromClient());
        repair.setInfoFromWorker(repairDTO.getInfoFromWorker());
        repair.setStatus(CarStatus.valueOf(repairDTO.getStatus()));
        repair.setRepairedBy(userService.findByWorkerCode(repairDTO.getRepairedBy()));
        repair.setCar(repairDTO.getCar());
        return repair;
    }
}