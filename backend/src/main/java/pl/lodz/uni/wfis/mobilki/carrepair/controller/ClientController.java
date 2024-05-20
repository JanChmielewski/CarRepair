package pl.lodz.uni.wfis.mobilki.carrepair.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.ClientDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.service.ClientService;

@RestController
public class ClientController {

    private ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping("/addClient")
    public ResponseEntity<?> addClient(@RequestBody ClientDTO clientToAdd) {
        if (clientToAdd == null) {
            return ResponseEntity.badRequest().body("Client data is empty");
        }
        clientService.addClient(clientToAdd);
        return ResponseEntity.ok("Client added to the database");
    }
}
