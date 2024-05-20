package pl.lodz.uni.wfis.mobilki.carrepair.mappers;

import org.springframework.stereotype.Component;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.ClientDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.model.Client;

@Component
public class ClientMapper {

//    private ClientService clientService; // TODO: Implement this class

    public ClientDTO toDTO(Client client) {
        return new ClientDTO(client.getId(), client.getName(), client.getSurname(), client.getEmail(), client.getPhoneNumber());
    }

    public Client toEntity(ClientDTO clientDTO) {
        Client client = new Client();
        client.setId(clientDTO.getId());
        client.setName(clientDTO.getName());
        client.setSurname(clientDTO.getSurname());
        client.setEmail(clientDTO.getEmail());
        client.setPhoneNumber(clientDTO.getPhoneNumber());
        return client;
    }
}
