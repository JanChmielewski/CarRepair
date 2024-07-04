package pl.lodz.uni.wfis.mobilki.carrepair.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.ClientDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Client;
import pl.lodz.uni.wfis.mobilki.carrepair.service.ClientService;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping("/addClient")
    public ResponseEntity<?> addClient(@RequestBody ClientDTO clientToAdd) {
        if (clientToAdd == null) {
            return ResponseEntity.badRequest().body("Client data is empty");
        }
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message: ", "Client added to the database");
        Client newClient = clientService.addClient(clientToAdd);
        response.put("clientId", newClient.getId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/clients")
    public ResponseEntity<?> getClients() {
        List<Client> clients = clientService.getExistingClients();
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message: ", "List of clients retrieved successfully");
        response.put("clients", clients);
        return ResponseEntity.ok(response);
    }
}
