package pl.lodz.uni.wfis.mobilki.carrepair.mappers;

import org.springframework.stereotype.Component;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.UserDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.model.User;

@Component
public class UserMapper {

    public UserDTO toDTO(User user) {
        return new UserDTO(user.getId(), user.getWorkerCode(), user.getName(), user.getSurname(), user.getPassword());
    }

    public User toEntity(UserDTO userDTO) {
        return new User(userDTO.getId(), userDTO.getWorkerCode(), userDTO.getName(), userDTO.getSurname(), userDTO.getPassword());
    }
}
