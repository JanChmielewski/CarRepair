package pl.lodz.uni.wfis.mobilki.carrepair.service;

import org.springframework.stereotype.Service;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.ClientDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Client;
import pl.lodz.uni.wfis.mobilki.carrepair.repository.ClientRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> getClientsForDashboard() {
        return clientRepository.findAll();
    }

    public void addClient(ClientDTO clientToAdd) {
        Client client = new Client(
                clientToAdd.getName(),
                clientToAdd.getSurname(),
                clientToAdd.getPhoneNumber(),
                clientToAdd.getEmail()
        );

        clientRepository.save(client);
    }

    public List<Client> getExistingClients() {
        return clientRepository.findAll();
    }

    public Optional<Client> getOwnerOfCar(Long clientId) {
        return clientRepository.findById(clientId);
    }
}
