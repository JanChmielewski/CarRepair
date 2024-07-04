package pl.lodz.uni.wfis.mobilki.carrepair.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity(name = "repair")
public class Repair {

    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    LocalDateTime dateOfAdmission;

    @Column
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    LocalDateTime dateOFHandingOver;

    @Column
    private String infoFromClient;

    @Column
    private String infoFromWorker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User repairedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "carId")
    private Car car;

    @Column
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:")
    LocalDateTime lastUpdated;

}
