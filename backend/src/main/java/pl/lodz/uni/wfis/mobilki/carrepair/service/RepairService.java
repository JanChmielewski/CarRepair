package pl.lodz.uni.wfis.mobilki.carrepair.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Repair;
import pl.lodz.uni.wfis.mobilki.carrepair.model.User;
import pl.lodz.uni.wfis.mobilki.carrepair.repository.CarRepository;
import pl.lodz.uni.wfis.mobilki.carrepair.repository.RepairRepository;
import pl.lodz.uni.wfis.mobilki.carrepair.request.repairRequest.AddRepairRequest;
import pl.lodz.uni.wfis.mobilki.carrepair.request.repairRequest.EditRepairInfoRequest;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class RepairService {

    private final RepairRepository repairRepository;
    private final CarRepository carRepository;
    private final UserService userService;

    public RepairService(RepairRepository repairRepository, CarRepository carRepository, UserService userService) {
        this.repairRepository = repairRepository;
        this.carRepository = carRepository;
        this.userService = userService;
    }

    public List<Repair> getExistingRepairs() {
        return repairRepository.findAll();
    }

    public Repair getRepair(Long repairID) {
        return repairRepository.findById(repairID)
                .orElseThrow(() -> new IllegalArgumentException("Repair with id: " + repairID + " not found"));
    }

    public void addRepair(AddRepairRequest repairRequest, Long carID) {
        if (repairRequest == null) {
            throw new IllegalArgumentException("Repair data is empty");
        }
        if (carRepository.findById(carID).isEmpty()) {
            throw new IllegalArgumentException("Car with given ID does not exist");
        }
        Repair repair = new Repair();
        if (repairRequest.getDateOfAdmission() != null) {
            repair.setDateOfAdmission(repairRequest.getDateOfAdmission());
        }
        if (repairRequest.getDateOFHandingOver() != null) {
             repair.setDateOfAdmission(LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES));
        }
        if (repairRequest.getInfoFromClient() != null) {
            repair.setInfoFromClient(repairRequest.getInfoFromClient());
        }
        if (repairRequest.getInfoFromWorker() != null) {
            repair.setInfoFromWorker(repairRequest.getInfoFromWorker());
        }
        repair.setCar(carRepository.findById(carID).get());

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            User user = userService.findByWorkerCode(username);
            repair.setRepairedBy(user);
        }

        repairRepository.save(repair);
    }

    public Map<String, Object> editRepair(EditRepairInfoRequest editRepairInfoRequest, Long repairID) {
        Repair repair = repairRepository.findById(repairID)
                .orElseThrow(() -> new IllegalArgumentException("Repair with id: " + repairID + " not found"));

        Map<String, Object> updatedFields = new LinkedHashMap<>();

        if(editRepairInfoRequest.getDateOfAdmission() != null) {
            repair.setDateOfAdmission(editRepairInfoRequest.getDateOfAdmission());
            updatedFields.put("dateOfAdmission", editRepairInfoRequest.getDateOfAdmission());
        }
        if(editRepairInfoRequest.getDateOFHandingOver() != null) {
            repair.setDateOFHandingOver(editRepairInfoRequest.getDateOFHandingOver());
            updatedFields.put("dateOFHandingOver", editRepairInfoRequest.getDateOFHandingOver());
        }
        if(editRepairInfoRequest.getInfoFromClient() != null) {
            repair.setInfoFromClient(editRepairInfoRequest.getInfoFromClient());
            updatedFields.put("infoFromClient", editRepairInfoRequest.getInfoFromClient());
        }
        if(editRepairInfoRequest.getInfoFromWorker() != null) {
            repair.setInfoFromWorker(editRepairInfoRequest.getInfoFromWorker());
            updatedFields.put("infoFromWorker", editRepairInfoRequest.getInfoFromWorker());
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime updateDate = LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES);
        repair.setLastUpdated(updateDate);
        updatedFields.put("lastUpdated", updateDate.format(formatter));
        return updatedFields;

    }
}
