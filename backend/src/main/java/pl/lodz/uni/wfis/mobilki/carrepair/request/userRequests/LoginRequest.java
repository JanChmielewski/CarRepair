package pl.lodz.uni.wfis.mobilki.carrepair.request.userRequests;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LoginRequest {
    private String workerCode;
    private String password;
}
