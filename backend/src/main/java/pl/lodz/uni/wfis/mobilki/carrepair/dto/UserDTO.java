package pl.lodz.uni.wfis.mobilki.carrepair.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Long id;
    private String workerCode;
    private String name;
    private String surname;
    private String password;
}
