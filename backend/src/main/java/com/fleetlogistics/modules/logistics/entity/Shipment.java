package com.fleetlogistics.modules.logistics.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "shipments")
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String trackingNumber;

    @Column(nullable = false)
    private String customerName;

    private String originAddress;
    private Double originLat;
    private Double originLng;

    private String destinationAddress;
    private Double destLat;
    private Double destLng;

    private Double weightKg;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ShipmentPriority priority;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ShipmentStatus status;

    private LocalDateTime scheduledDeparture;
    private LocalDateTime estimatedArrival;
    private LocalDateTime actualArrival;

    public enum ShipmentPriority {
        STANDARD,
        EXPRESS,
        CRITICAL
    }

    public enum ShipmentStatus {
        CREATED,
        ASSIGNED,
        IN_TRANSIT,
        DELIVERED,
        DELAYED,
        FAILED
    }

    public Shipment() {}

    public Shipment(String trackingNumber, String customerName, String originAddress, Double originLat, Double originLng,
                    String destinationAddress, Double destLat, Double destLng, Double weightKg,
                    ShipmentPriority priority, ShipmentStatus status, LocalDateTime scheduledDeparture,
                    LocalDateTime estimatedArrival, LocalDateTime actualArrival) {
        this.trackingNumber = trackingNumber;
        this.customerName = customerName;
        this.originAddress = originAddress;
        this.originLat = originLat;
        this.originLng = originLng;
        this.destinationAddress = destinationAddress;
        this.destLat = destLat;
        this.destLng = destLng;
        this.weightKg = weightKg;
        this.priority = priority;
        this.status = status;
        this.scheduledDeparture = scheduledDeparture;
        this.estimatedArrival = estimatedArrival;
        this.actualArrival = actualArrival;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTrackingNumber() { return trackingNumber; }
    public void setTrackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getOriginAddress() { return originAddress; }
    public void setOriginAddress(String originAddress) { this.originAddress = originAddress; }

    public Double getOriginLat() { return originLat; }
    public void setOriginLat(Double originLat) { this.originLat = originLat; }

    public Double getOriginLng() { return originLng; }
    public void setOriginLng(Double originLng) { this.originLng = originLng; }

    public String getDestinationAddress() { return destinationAddress; }
    public void setDestinationAddress(String destinationAddress) { this.destinationAddress = destinationAddress; }

    public Double getDestLat() { return destLat; }
    public void setDestLat(Double destLat) { this.destLat = destLat; }

    public Double getDestLng() { return destLng; }
    public void setDestLng(Double destLng) { this.destLng = destLng; }

    public Double getWeightKg() { return weightKg; }
    public void setWeightKg(Double weightKg) { this.weightKg = weightKg; }

    public ShipmentPriority getPriority() { return priority; }
    public void setPriority(ShipmentPriority priority) { this.priority = priority; }

    public ShipmentStatus getStatus() { return status; }
    public void setStatus(ShipmentStatus status) { this.status = status; }

    public LocalDateTime getScheduledDeparture() { return scheduledDeparture; }
    public void setScheduledDeparture(LocalDateTime scheduledDeparture) { this.scheduledDeparture = scheduledDeparture; }

    public LocalDateTime getEstimatedArrival() { return estimatedArrival; }
    public void setEstimatedArrival(LocalDateTime estimatedArrival) { this.estimatedArrival = estimatedArrival; }

    public LocalDateTime getActualArrival() { return actualArrival; }
    public void setActualArrival(LocalDateTime actualArrival) { this.actualArrival = actualArrival; }
}
