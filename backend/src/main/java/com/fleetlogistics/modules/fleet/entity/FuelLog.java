package com.fleetlogistics.modules.fleet.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "fuel_logs")
public class FuelLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @ManyToOne(optional = false)
    @JoinColumn(name = "driver_id")
    private Driver driver;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Column(nullable = false)
    private Double litersFilled;

    @Column(nullable = false)
    private Double totalCost;

    private Double odometerKm;
    private String stationLocation;
    
    // Distance / Liters since previous log
    private Double efficiencyKmPerLiter;

    public FuelLog() {}

    public FuelLog(Vehicle vehicle, Driver driver, LocalDateTime timestamp, Double litersFilled,
                   Double totalCost, Double odometerKm, String stationLocation, Double efficiencyKmPerLiter) {
        this.vehicle = vehicle;
        this.driver = driver;
        this.timestamp = timestamp;
        this.litersFilled = litersFilled;
        this.totalCost = totalCost;
        this.odometerKm = odometerKm;
        this.stationLocation = stationLocation;
        this.efficiencyKmPerLiter = efficiencyKmPerLiter;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Vehicle getVehicle() { return vehicle; }
    public void setVehicle(Vehicle vehicle) { this.vehicle = vehicle; }

    public Driver getDriver() { return driver; }
    public void setDriver(Driver driver) { this.driver = driver; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public Double getLitersFilled() { return litersFilled; }
    public void setLitersFilled(Double litersFilled) { this.litersFilled = litersFilled; }

    public Double getTotalCost() { return totalCost; }
    public void setTotalCost(Double totalCost) { this.totalCost = totalCost; }

    public Double getOdometerKm() { return odometerKm; }
    public void setOdometerKm(Double odometerKm) { this.odometerKm = odometerKm; }

    public String getStationLocation() { return stationLocation; }
    public void setStationLocation(String stationLocation) { this.stationLocation = stationLocation; }

    public Double getEfficiencyKmPerLiter() { return efficiencyKmPerLiter; }
    public void setEfficiencyKmPerLiter(Double efficiencyKmPerLiter) { this.efficiencyKmPerLiter = efficiencyKmPerLiter; }
}
