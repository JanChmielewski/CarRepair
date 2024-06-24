package pl.lodz.uni.wfis.mobilki.carrepair.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table
@Entity(name = "app_user")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String workerCode;

    @Column
    private String name;

    @Column
    private String surname;

    @Column
    private String password;

    @Enumerated(EnumType.STRING)
    private Authority authority;
}
