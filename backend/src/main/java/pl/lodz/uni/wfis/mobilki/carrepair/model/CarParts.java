package pl.lodz.uni.wfis.mobilki.carrepair.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "car_parts")
public class CarParts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String partNum;

    @Column
    private double price;

    @Column
    private int quantity;

    @Column
    private String description;

    @Column
    private String carModel;

    @Enumerated(EnumType.STRING)
    @Column
    private CarPartCategory category;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPartNum() {
        return partNum;
    }

    public void setPartNum(String partNum) {
        this.partNum = partNum;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCarModel() {
        return carModel;
    }

    public void setCarModel(String carModel) {
        this.carModel = carModel;
    }

    public CarPartCategory getCategory() {
        return category;
    }

    public void setCategory(CarPartCategory category) {
        this.category = category;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CarParts carParts = (CarParts) o;
        return Double.compare(carParts.price, price) == 0 &&
                quantity == carParts.quantity &&
                Objects.equals(id, carParts.id) &&
                Objects.equals(name, carParts.name) &&
                Objects.equals(partNum, carParts.partNum) &&
                Objects.equals(description, carParts.description) &&
                Objects.equals(carModel, carParts.carModel) &&
                category == carParts.category;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, partNum, price, quantity, description, carModel, category);
    }

    @Override
    public String toString() {
        return "CarParts{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", partNum='" + partNum + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", description='" + description + '\'' +
                ", carModel='" + carModel + '\'' +
                ", category=" + category +
                '}';
    }
}