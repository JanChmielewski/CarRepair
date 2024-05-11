package pl.lodz.uni.wfis.mobilki.carrepair.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RegistrationRequest {
    private String name;
    private String surname;
    private String password;
}
