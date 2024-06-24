package pl.lodz.uni.wfis.mobilki.carrepair.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table
@Entity(name = "car")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Car {

    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String brand;

    @Column
    private String model;

    @Column
    private int yearOfProduction;

    @Column
    private String registrationNumber;

    @Column
    private String vin;

    @Column
    private String mileage;

    @Column
    private String engine;

    @Column
    @Enumerated(EnumType.STRING)
    private CarStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clientId")
    private Client client;

    @Column
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:")
    LocalDateTime lastUpdated;

    public Car(String brand, String model, int yearOfProduction, String registrationNumber,
               String vin, String mileage, String engine, CarStatus status, Client client) {
        this.brand = brand;
        this.model = model;
        this.yearOfProduction = yearOfProduction;
        this.registrationNumber = registrationNumber;
        this.vin = vin;
        this.mileage = mileage;
        this.engine = engine;
        this.status = status;
        this.client = client;
    }
}
