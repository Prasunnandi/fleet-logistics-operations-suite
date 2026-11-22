package com.fleetlogistics.modules.logistics.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "failed_delivery_events")
public class FailedDeliveryEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "shipment_id")
    private Shipment shipment;

    @ManyToOne
    @JoinColumn(name = "trip_id")
    private TripSchedule tripSchedule;

    @Column(nullable = false)
    private LocalDateTime failureTimestamp;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FailureReason reason;

    private String incidentLocation;
    private Double locationLat;
    private Double locationLng;
    private String resolutionNotes;
    private Boolean retryScheduled;

    public enum FailureReason {
        CUSTOMER_UNAVAILABLE,
        WRONG_ADDRESS,
        VEHICLE_BREAKDOWN,
        ACCESS_RESTRICTED,
        WEATHER_CONDITION,
        TRAFFIC_CONGESTION
    }

    public FailedDeliveryEvent() {}

    public FailedDeliveryEvent(Shipment shipment, TripSchedule tripSchedule, LocalDateTime failureTimestamp,
                               FailureReason reason, String incidentLocation, Double locationLat,
                               Double locationLng, String resolutionNotes, Boolean retryScheduled) {
        this.shipment = shipment;
        this.tripSchedule = tripSchedule;
        this.failureTimestamp = failureTimestamp;
        this.reason = reason;
        this.incidentLocation = incidentLocation;
        this.locationLat = locationLat;
        this.locationLng = locationLng;
        this.resolutionNotes = resolutionNotes;
        this.retryScheduled = retryScheduled;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Shipment getShipment() { return shipment; }
    public void setShipment(Shipment shipment) { this.shipment = shipment; }

    public TripSchedule getTripSchedule() { return tripSchedule; }
    public void setTripSchedule(TripSchedule tripSchedule) { this.tripSchedule = tripSchedule; }

    public LocalDateTime getFailureTimestamp() { return failureTimestamp; }
    public void setFailureTimestamp(LocalDateTime failureTimestamp) { this.failureTimestamp = failureTimestamp; }

    public FailureReason getReason() { return reason; }
    public void setReason(FailureReason reason) { this.reason = reason; }

    public String getIncidentLocation() { return incidentLocation; }
    public void setIncidentLocation(String incidentLocation) { this.incidentLocation = incidentLocation; }

    public Double getLocationLat() { return locationLat; }
    public void setLocationLat(Double locationLat) { this.locationLat = locationLat; }

    public Double getLocationLng() { return locationLng; }
    public void setLocationLng(Double locationLng) { this.locationLng = locationLng; }

    public String getResolutionNotes() { return resolutionNotes; }
    public void setResolutionNotes(String resolutionNotes) { this.resolutionNotes = resolutionNotes; }

    public Boolean getRetryScheduled() { return retryScheduled; }
    public void setRetryScheduled(Boolean retryScheduled) { this.retryScheduled = retryScheduled; }
}
