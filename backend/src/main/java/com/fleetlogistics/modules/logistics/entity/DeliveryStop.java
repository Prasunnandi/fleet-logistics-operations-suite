package com.fleetlogistics.modules.logistics.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "delivery_stops")
public class DeliveryStop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "trip_id")
    private TripSchedule tripSchedule;

    @ManyToOne
    @JoinColumn(name = "shipment_id")
    private Shipment shipment;

    private Integer sequenceIndex;
    private String address;
    private String cityName;
    private Double latitude;
    private Double longitude;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StopType stopType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StopStatus status;

    private LocalDateTime estimatedTime;
    private LocalDateTime actualTime;
    private String delayReason;

    public enum StopType {
        PICKUP,
        DROPOFF,
        WAYPOINT
    }

    public enum StopStatus {
        PENDING,
        IN_PROGRESS,
        COMPLETED,
        SKIPPED,
        FAILED
    }

    public DeliveryStop() {}

    public DeliveryStop(TripSchedule tripSchedule, Shipment shipment, Integer sequenceIndex, String address,
                        String cityName, Double latitude, Double longitude, StopType stopType, StopStatus status,
                        LocalDateTime estimatedTime, LocalDateTime actualTime, String delayReason) {
        this.tripSchedule = tripSchedule;
        this.shipment = shipment;
        this.sequenceIndex = sequenceIndex;
        this.address = address;
        this.cityName = cityName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.stopType = stopType;
        this.status = status;
        this.estimatedTime = estimatedTime;
        this.actualTime = actualTime;
        this.delayReason = delayReason;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public TripSchedule getTripSchedule() { return tripSchedule; }
    public void setTripSchedule(TripSchedule tripSchedule) { this.tripSchedule = tripSchedule; }

    public Shipment getShipment() { return shipment; }
    public void setShipment(Shipment shipment) { this.shipment = shipment; }

    public Integer getSequenceIndex() { return sequenceIndex; }
    public void setSequenceIndex(Integer sequenceIndex) { this.sequenceIndex = sequenceIndex; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCityName() { return cityName; }
    public void setCityName(String cityName) { this.cityName = cityName; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public StopType getStopType() { return stopType; }
    public void setStopType(StopType stopType) { this.stopType = stopType; }

    public StopStatus getStatus() { return status; }
    public void setStatus(StopStatus status) { this.status = status; }

    public LocalDateTime getEstimatedTime() { return estimatedTime; }
    public void setEstimatedTime(LocalDateTime estimatedTime) { this.estimatedTime = estimatedTime; }

    public LocalDateTime getActualTime() { return actualTime; }
    public void setActualTime(LocalDateTime actualTime) { this.actualTime = actualTime; }

    public String getDelayReason() { return delayReason; }
    public void setDelayReason(String delayReason) { this.delayReason = delayReason; }
}
