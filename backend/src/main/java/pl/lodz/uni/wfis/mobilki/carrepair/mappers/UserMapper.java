package pl.lodz.uni.wfis.mobilki.carrepair.mappers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import pl.lodz.uni.wfis.mobilki.carrepair.dto.UserDTO;
import pl.lodz.uni.wfis.mobilki.carrepair.model.User;
import pl.lodz.uni.wfis.mobilki.carrepair.request.RegistrationRequest;
import pl.lodz.uni.wfis.mobilki.carrepair.service.UserService;


@Component
public class UserMapper {

    private UserService userService;

    @Autowired
    public void setUserService(@Lazy UserService userService) {
        this.userService = userService;
    }

    public UserDTO toDTO(User user) {
        return new UserDTO(user.getId(), user.getWorkerCode(), user.getName(), user.getSurname(), user.getPassword());
    }

    public User toEntity(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setWorkerCode(userDTO.getWorkerCode());
        user.setName(userDTO.getName());
        user.setSurname(userDTO.getSurname());
        user.setPassword(userDTO.getPassword());
        return user;
    }

    public User toEntity(RegistrationRequest request) {
        User user = new User();
        user.setWorkerCode(userService.generateWorkerCode());
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        user.setPassword(request.getPassword());
        return user;
    }


}
