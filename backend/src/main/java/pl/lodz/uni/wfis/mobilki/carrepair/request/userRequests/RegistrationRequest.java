package pl.lodz.uni.wfis.mobilki.carrepair.request.userRequests;

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
    private String authority;
}
