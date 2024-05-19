package pl.lodz.uni.wfis.mobilki.carrepair.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.lodz.uni.wfis.mobilki.carrepair.model.RepairStatus;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "repair")
public class Repair {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String description;

    @Enumerated(EnumType.STRING)
    @Column
    private RepairStatus status;

    @Column
    private Date repairDate;
}
