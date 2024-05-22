package pl.lodz.uni.wfis.mobilki.carrepair.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table
@Entity(name = "car")
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

    @Enumerated(EnumType.STRING)
    private CarStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client client;

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
