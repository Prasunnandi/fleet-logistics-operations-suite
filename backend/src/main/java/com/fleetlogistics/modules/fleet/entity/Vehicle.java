package com.fleetlogistics.modules.fleet.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String plateNumber;

    @Column(nullable = false)
    private String model;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehicleType vehicleType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehicleStatus status;

    private Double capacityKg;
    private String fuelType;
    private Double currentMileageKm;
    private Double acquisitionCost;
    private LocalDate purchaseDate;

    public enum VehicleType {
        HEAVY_TRUCK,
        DELIVERY_VAN,
        FLATBED_TRAILER,
        REFRIGERATED_TRUCK,
        CARGO_TANKER
    }

    public enum VehicleStatus {
        AVAILABLE,
        IN_TRANSIT,
        MAINTENANCE,
        OUT_OF_SERVICE
    }

    public Vehicle() {}

    public Vehicle(String plateNumber, String model, VehicleType vehicleType, VehicleStatus status,
                   Double capacityKg, String fuelType, Double currentMileageKm, Double acquisitionCost, LocalDate purchaseDate) {
        this.plateNumber = plateNumber;
        this.model = model;
        this.vehicleType = vehicleType;
        this.status = status;
        this.capacityKg = capacityKg;
        this.fuelType = fuelType;
        this.currentMileageKm = currentMileageKm;
        this.acquisitionCost = acquisitionCost;
        this.purchaseDate = purchaseDate;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPlateNumber() { return plateNumber; }
    public void setPlateNumber(String plateNumber) { this.plateNumber = plateNumber; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public VehicleType getVehicleType() { return vehicleType; }
    public void setVehicleType(VehicleType vehicleType) { this.vehicleType = vehicleType; }

    public VehicleStatus getStatus() { return status; }
    public void setStatus(VehicleStatus status) { this.status = status; }

    public Double getCapacityKg() { return capacityKg; }
    public void setCapacityKg(Double capacityKg) { this.capacityKg = capacityKg; }

    public String getFuelType() { return fuelType; }
    public void setFuelType(String fuelType) { this.fuelType = fuelType; }

    public Double getCurrentMileageKm() { return currentMileageKm; }
    public void setCurrentMileageKm(Double currentMileageKm) { this.currentMileageKm = currentMileageKm; }

    public Double getAcquisitionCost() { return acquisitionCost; }
    public void setAcquisitionCost(Double acquisitionCost) { this.acquisitionCost = acquisitionCost; }

    public LocalDate getPurchaseDate() { return purchaseDate; }
    public void setPurchaseDate(LocalDate purchaseDate) { this.purchaseDate = purchaseDate; }
}
