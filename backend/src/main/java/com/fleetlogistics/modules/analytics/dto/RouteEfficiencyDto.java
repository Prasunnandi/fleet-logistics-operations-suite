package com.fleetlogistics.modules.analytics.dto;

public class RouteEfficiencyDto {
    private String corridorName;
    private String originCity;
    private String destinationCity;
    private long totalTrips;
    private long onTimeTrips;
    private long delayedTrips;
    private double onTimePercentage;
    private double averageDelayMinutes;
    private double averageTripDurationHours;
    private String efficiencyGrade; // EXCELLENT, ACCEPTABLE, BOTTLENECK

    public RouteEfficiencyDto() {}

    public RouteEfficiencyDto(String corridorName, String originCity, String destinationCity, long totalTrips,
                              long onTimeTrips, long delayedTrips, double onTimePercentage,
                              double averageDelayMinutes, double averageTripDurationHours, String efficiencyGrade) {
        this.corridorName = corridorName;
        this.originCity = originCity;
        this.destinationCity = destinationCity;
        this.totalTrips = totalTrips;
        this.onTimeTrips = onTimeTrips;
        this.delayedTrips = delayedTrips;
        this.onTimePercentage = onTimePercentage;
        this.averageDelayMinutes = averageDelayMinutes;
        this.averageTripDurationHours = averageTripDurationHours;
        this.efficiencyGrade = efficiencyGrade;
    }

    // Getters and Setters
    public String getCorridorName() { return corridorName; }
    public void setCorridorName(String corridorName) { this.corridorName = corridorName; }

    public String getOriginCity() { return originCity; }
    public void setOriginCity(String originCity) { this.originCity = originCity; }

    public String getDestinationCity() { return destinationCity; }
    public void setDestinationCity(String destinationCity) { this.destinationCity = destinationCity; }

    public long getTotalTrips() { return totalTrips; }
    public void setTotalTrips(long totalTrips) { this.totalTrips = totalTrips; }

    public long getOnTimeTrips() { return onTimeTrips; }
    public void setOnTimeTrips(long onTimeTrips) { this.onTimeTrips = onTimeTrips; }

    public long getDelayedTrips() { return delayedTrips; }
    public void setDelayedTrips(long delayedTrips) { this.delayedTrips = delayedTrips; }

    public double getOnTimePercentage() { return onTimePercentage; }
    public void setOnTimePercentage(double onTimePercentage) { this.onTimePercentage = onTimePercentage; }

    public double getAverageDelayMinutes() { return averageDelayMinutes; }
    public void setAverageDelayMinutes(double averageDelayMinutes) { this.averageDelayMinutes = averageDelayMinutes; }

    public double getAverageTripDurationHours() { return averageTripDurationHours; }
    public void setAverageTripDurationHours(double averageTripDurationHours) { this.averageTripDurationHours = averageTripDurationHours; }

    public String getEfficiencyGrade() { return efficiencyGrade; }
    public void setEfficiencyGrade(String efficiencyGrade) { this.efficiencyGrade = efficiencyGrade; }
}
