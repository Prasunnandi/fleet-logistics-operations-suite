package com.fleetlogistics.modules.fleet.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "drivers")
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String licenseNumber;

    private String phone;
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DriverStatus status;

    private Double rating;
    private Integer totalTripsCompleted;
    private Integer experienceYears;

    @OneToOne
    @JoinColumn(name = "assigned_vehicle_id")
    private Vehicle assignedVehicle;

    public enum DriverStatus {
        AVAILABLE,
        ON_DUTY,
        OFF_DUTY,
        SUSPENDED
    }

    public Driver() {}

    public Driver(String fullName, String licenseNumber, String phone, String email,
                  DriverStatus status, Double rating, Integer totalTripsCompleted, Integer experienceYears) {
        this.fullName = fullName;
        this.licenseNumber = licenseNumber;
        this.phone = phone;
        this.email = email;
        this.status = status;
        this.rating = rating;
        this.totalTripsCompleted = totalTripsCompleted;
        this.experienceYears = experienceYears;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public DriverStatus getStatus() { return status; }
    public void setStatus(DriverStatus status) { this.status = status; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getTotalTripsCompleted() { return totalTripsCompleted; }
    public void setTotalTripsCompleted(Integer totalTripsCompleted) { this.totalTripsCompleted = totalTripsCompleted; }

    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }

    public Vehicle getAssignedVehicle() { return assignedVehicle; }
    public void setAssignedVehicle(Vehicle assignedVehicle) { this.assignedVehicle = assignedVehicle; }
}
