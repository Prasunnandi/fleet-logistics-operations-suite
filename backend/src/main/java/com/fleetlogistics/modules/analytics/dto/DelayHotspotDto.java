package com.fleetlogistics.modules.analytics.dto;

public class DelayHotspotDto {
    private String locationName;
    private Double latitude;
    private Double longitude;
    private long totalIncidents;
    private long failedDeliveries;
    private long delayedStops;
    private String primaryRootCause;
    private double riskIndex; // 0 - 100
    private String severityLevel; // LOW, MODERATE, HIGH_ALERT

    public DelayHotspotDto() {}

    public DelayHotspotDto(String locationName, Double latitude, Double longitude, long totalIncidents,
                           long failedDeliveries, long delayedStops, String primaryRootCause,
                           double riskIndex, String severityLevel) {
        this.locationName = locationName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.totalIncidents = totalIncidents;
        this.failedDeliveries = failedDeliveries;
        this.delayedStops = delayedStops;
        this.primaryRootCause = primaryRootCause;
        this.riskIndex = riskIndex;
        this.severityLevel = severityLevel;
    }

    // Getters and Setters
    public String getLocationName() { return locationName; }
    public void setLocationName(String locationName) { this.locationName = locationName; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public long getTotalIncidents() { return totalIncidents; }
    public void setTotalIncidents(long totalIncidents) { this.totalIncidents = totalIncidents; }

    public long getFailedDeliveries() { return failedDeliveries; }
    public void setFailedDeliveries(long failedDeliveries) { this.failedDeliveries = failedDeliveries; }

    public long getDelayedStops() { return delayedStops; }
    public void setDelayedStops(long delayedStops) { this.delayedStops = delayedStops; }

    public String getPrimaryRootCause() { return primaryRootCause; }
    public void setPrimaryRootCause(String primaryRootCause) { this.primaryRootCause = primaryRootCause; }

    public double getRiskIndex() { return riskIndex; }
    public void setRiskIndex(double riskIndex) { this.riskIndex = riskIndex; }

    public String getSeverityLevel() { return severityLevel; }
    public void setSeverityLevel(String severityLevel) { this.severityLevel = severityLevel; }
}
