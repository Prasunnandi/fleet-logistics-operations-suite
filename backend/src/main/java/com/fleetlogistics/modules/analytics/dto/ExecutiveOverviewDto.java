package com.fleetlogistics.modules.analytics.dto;

public class ExecutiveOverviewDto {
    private long totalVehicles;
    private long activeVehicles;
    private long totalDrivers;
    private long onDutyDrivers;
    private long activeTrips;
    private long totalShipments;
    private long inTransitShipments;
    private long delayedShipments;
    private long failedShipments;
    private double onTimeDeliveryRate;
    private double totalFuelSpend;
    private double totalMaintenanceSpend;

    public ExecutiveOverviewDto() {}

    public ExecutiveOverviewDto(long totalVehicles, long activeVehicles, long totalDrivers, long onDutyDrivers,
                                long activeTrips, long totalShipments, long inTransitShipments,
                                long delayedShipments, long failedShipments, double onTimeDeliveryRate,
                                double totalFuelSpend, double totalMaintenanceSpend) {
        this.totalVehicles = totalVehicles;
        this.activeVehicles = activeVehicles;
        this.totalDrivers = totalDrivers;
        this.onDutyDrivers = onDutyDrivers;
        this.activeTrips = activeTrips;
        this.totalShipments = totalShipments;
        this.inTransitShipments = inTransitShipments;
        this.delayedShipments = delayedShipments;
        this.failedShipments = failedShipments;
        this.onTimeDeliveryRate = onTimeDeliveryRate;
        this.totalFuelSpend = totalFuelSpend;
        this.totalMaintenanceSpend = totalMaintenanceSpend;
    }

    // Getters and Setters
    public long getTotalVehicles() { return totalVehicles; }
    public void setTotalVehicles(long totalVehicles) { this.totalVehicles = totalVehicles; }

    public long getActiveVehicles() { return activeVehicles; }
    public void setActiveVehicles(long activeVehicles) { this.activeVehicles = activeVehicles; }

    public long getTotalDrivers() { return totalDrivers; }
    public void setTotalDrivers(long totalDrivers) { this.totalDrivers = totalDrivers; }

    public long getOnDutyDrivers() { return onDutyDrivers; }
    public void setOnDutyDrivers(long onDutyDrivers) { this.onDutyDrivers = onDutyDrivers; }

    public long getActiveTrips() { return activeTrips; }
    public void setActiveTrips(long activeTrips) { this.activeTrips = activeTrips; }

    public long getTotalShipments() { return totalShipments; }
    public void setTotalShipments(long totalShipments) { this.totalShipments = totalShipments; }

    public long getInTransitShipments() { return inTransitShipments; }
    public void setInTransitShipments(long inTransitShipments) { this.inTransitShipments = inTransitShipments; }

    public long getDelayedShipments() { return delayedShipments; }
    public void setDelayedShipments(long delayedShipments) { this.delayedShipments = delayedShipments; }

    public long getFailedShipments() { return failedShipments; }
    public void setFailedShipments(long failedShipments) { this.failedShipments = failedShipments; }

    public double getOnTimeDeliveryRate() { return onTimeDeliveryRate; }
    public void setOnTimeDeliveryRate(double onTimeDeliveryRate) { this.onTimeDeliveryRate = onTimeDeliveryRate; }

    public double getTotalFuelSpend() { return totalFuelSpend; }
    public void setTotalFuelSpend(double totalFuelSpend) { this.totalFuelSpend = totalFuelSpend; }

    public double getTotalMaintenanceSpend() { return totalMaintenanceSpend; }
    public void setTotalMaintenanceSpend(double totalMaintenanceSpend) { this.totalMaintenanceSpend = totalMaintenanceSpend; }
}
