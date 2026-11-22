package com.fleetlogistics.modules.fleet.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "maintenance_records")
public class MaintenanceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @Column(nullable = false)
    private LocalDate serviceDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceType serviceType;

    @Column(nullable = false)
    private Double cost;

    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MaintenanceStatus status;

    private Double odometerAtService;
    private Double nextServiceDueMileage;

    public enum ServiceType {
        OIL_CHANGE,
        BRAKE_REPAIR,
        TIRE_REPLACEMENT,
        ENGINE_OVERHAUL,
        TRANSMISSION_SERVICE,
        ELECTRICAL_SYSTEM,
        ROUTINE_INSPECTION
    }

    public enum MaintenanceStatus {
        SCHEDULED,
        IN_PROGRESS,
        COMPLETED,
        CANCELLED
    }

    public MaintenanceRecord() {}

    public MaintenanceRecord(Vehicle vehicle, LocalDate serviceDate, ServiceType serviceType, Double cost,
                             String description, MaintenanceStatus status, Double odometerAtService, Double nextServiceDueMileage) {
        this.vehicle = vehicle;
        this.serviceDate = serviceDate;
        this.serviceType = serviceType;
        this.cost = cost;
        this.description = description;
        this.status = status;
        this.odometerAtService = odometerAtService;
        this.nextServiceDueMileage = nextServiceDueMileage;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Vehicle getVehicle() { return vehicle; }
    public void setVehicle(Vehicle vehicle) { this.vehicle = vehicle; }

    public LocalDate getServiceDate() { return serviceDate; }
    public void setServiceDate(LocalDate serviceDate) { this.serviceDate = serviceDate; }

    public ServiceType getServiceType() { return serviceType; }
    public void setServiceType(ServiceType serviceType) { this.serviceType = serviceType; }

    public Double getCost() { return cost; }
    public void setCost(Double cost) { this.cost = cost; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public MaintenanceStatus getStatus() { return status; }
    public void setStatus(MaintenanceStatus status) { this.status = status; }

    public Double getOdometerAtService() { return odometerAtService; }
    public void setOdometerAtService(Double odometerAtService) { this.odometerAtService = odometerAtService; }

    public Double getNextServiceDueMileage() { return nextServiceDueMileage; }
    public void setNextServiceDueMileage(Double nextServiceDueMileage) { this.nextServiceDueMileage = nextServiceDueMileage; }
}
