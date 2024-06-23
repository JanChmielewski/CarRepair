package pl.lodz.uni.wfis.mobilki.carrepair.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Repair;
import pl.lodz.uni.wfis.mobilki.carrepair.request.repairRequest.AddRepairRequest;
import pl.lodz.uni.wfis.mobilki.carrepair.request.repairRequest.EditRepairInfoRequest;
import pl.lodz.uni.wfis.mobilki.carrepair.service.RepairService;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
public class RepairController {

    private final RepairService repairService;

    public RepairController(RepairService repairService) {
        this.repairService = repairService;
    }

    @GetMapping("/repairs")
    public ResponseEntity<?> getRepairs() {
        List<Repair> repairs = repairService.getExistingRepairs();
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message: ", "List of repairs retrieved successfully");
        response.put("repairs", repairs);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/addRepair/{carID}")
    public ResponseEntity<?> addRepair(@RequestBody AddRepairRequest repairRequest, @PathVariable Long carID) {
        if (repairRequest == null) {
            return ResponseEntity.badRequest().body("Repair data is empty");
        }
        repairService.addRepair(repairRequest, carID);
        return ResponseEntity.ok("Repair added to the database");
    }

    @PostMapping("/editRepair/{repairID}")
    public ResponseEntity<?> editRepair(@RequestBody EditRepairInfoRequest editRepairInfoRequest, @PathVariable Long repairID) {
        if (editRepairInfoRequest == null) {
            return ResponseEntity.badRequest().body("Repair data is empty");
        }
        Map<String, Object> updatedFields = repairService.editRepair(editRepairInfoRequest, repairID);
        Map<String, Object> resposne = new LinkedHashMap<>();
        resposne.put("message: ", "Repair with id: " + repairID + " updated successfully");
        resposne.put("updatedFields", updatedFields);
        return ResponseEntity.ok(resposne);
    }
}
