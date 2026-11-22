package com.fleetlogistics.modules.logistics.entity;

import com.fleetlogistics.modules.fleet.entity.Driver;
import com.fleetlogistics.modules.fleet.entity.Vehicle;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "trip_schedules")
public class TripSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String tripCode;

    @ManyToOne(optional = false)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @ManyToOne(optional = false)
    @JoinColumn(name = "driver_id")
    private Driver driver;

    private String originCity;
    private String destinationCity;

    private LocalDateTime departureTime;
    private LocalDateTime estimatedArrivalTime;
    private LocalDateTime actualCompletionTime;

    private Double currentLat;
    private Double currentLng;
    private Double currentSpeedKmh;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TripStatus status;

    private Double totalDistanceKm;

    public enum TripStatus {
        PLANNED,
        ACTIVE,
        DELAYED,
        COMPLETED,
        CANCELLED
    }

    public TripSchedule() {}

    public TripSchedule(String tripCode, Vehicle vehicle, Driver driver, String originCity, String destinationCity,
                        LocalDateTime departureTime, LocalDateTime estimatedArrivalTime, LocalDateTime actualCompletionTime,
                        Double currentLat, Double currentLng, Double currentSpeedKmh, TripStatus status, Double totalDistanceKm) {
        this.tripCode = tripCode;
        this.vehicle = vehicle;
        this.driver = driver;
        this.originCity = originCity;
        this.destinationCity = destinationCity;
        this.departureTime = departureTime;
        this.estimatedArrivalTime = estimatedArrivalTime;
        this.actualCompletionTime = actualCompletionTime;
        this.currentLat = currentLat;
        this.currentLng = currentLng;
        this.currentSpeedKmh = currentSpeedKmh;
        this.status = status;
        this.totalDistanceKm = totalDistanceKm;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTripCode() { return tripCode; }
    public void setTripCode(String tripCode) { this.tripCode = tripCode; }

    public Vehicle getVehicle() { return vehicle; }
    public void setVehicle(Vehicle vehicle) { this.vehicle = vehicle; }

    public Driver getDriver() { return driver; }
    public void setDriver(Driver driver) { this.driver = driver; }

    public String getOriginCity() { return originCity; }
    public void setOriginCity(String originCity) { this.originCity = originCity; }

    public String getDestinationCity() { return destinationCity; }
    public void setDestinationCity(String destinationCity) { this.destinationCity = destinationCity; }

    public LocalDateTime getDepartureTime() { return departureTime; }
    public void setDepartureTime(LocalDateTime departureTime) { this.departureTime = departureTime; }

    public LocalDateTime getEstimatedArrivalTime() { return estimatedArrivalTime; }
    public void setEstimatedArrivalTime(LocalDateTime estimatedArrivalTime) { this.estimatedArrivalTime = estimatedArrivalTime; }

    public LocalDateTime getActualCompletionTime() { return actualCompletionTime; }
    public void setActualCompletionTime(LocalDateTime actualCompletionTime) { this.actualCompletionTime = actualCompletionTime; }

    public Double getCurrentLat() { return currentLat; }
    public void setCurrentLat(Double currentLat) { this.currentLat = currentLat; }

    public Double getCurrentLng() { return currentLng; }
    public void setCurrentLng(Double currentLng) { this.currentLng = currentLng; }

    public Double getCurrentSpeedKmh() { return currentSpeedKmh; }
    public void setCurrentSpeedKmh(Double currentSpeedKmh) { this.currentSpeedKmh = currentSpeedKmh; }

    public TripStatus getStatus() { return status; }
    public void setStatus(TripStatus status) { this.status = status; }

    public Double getTotalDistanceKm() { return totalDistanceKm; }
    public void setTotalDistanceKm(Double totalDistanceKm) { this.totalDistanceKm = totalDistanceKm; }
}
