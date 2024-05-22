package pl.lodz.uni.wfis.mobilki.carrepair.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table
@Entity(name = "app_user")
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

    private String authority;
}
