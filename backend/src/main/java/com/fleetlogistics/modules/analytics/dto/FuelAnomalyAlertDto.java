package com.fleetlogistics.modules.analytics.dto;

public class FuelAnomalyAlertDto {
    private Long driverId;
    private String driverName;
    private Long vehicleId;
    private String vehiclePlate;
    private String vehicleModel;
    private Double observedEfficiencyKmPerLiter;
    private Double benchmarkEfficiencyKmPerLiter;
    private Double excessFuelConsumptionPercentage;
    private String anomalySeverity; // NORMAL, ELEVATED, UNUSUAL_ANOMALY
    private String rootCauseHypothesis;
    private String recommendedAction;

    public FuelAnomalyAlertDto() {}

    public FuelAnomalyAlertDto(Long driverId, String driverName, Long vehicleId, String vehiclePlate,
                               String vehicleModel, Double observedEfficiencyKmPerLiter,
                               Double benchmarkEfficiencyKmPerLiter, Double excessFuelConsumptionPercentage,
                               String anomalySeverity, String rootCauseHypothesis, String recommendedAction) {
        this.driverId = driverId;
        this.driverName = driverName;
        this.vehicleId = vehicleId;
        this.vehiclePlate = vehiclePlate;
        this.vehicleModel = vehicleModel;
        this.observedEfficiencyKmPerLiter = observedEfficiencyKmPerLiter;
        this.benchmarkEfficiencyKmPerLiter = benchmarkEfficiencyKmPerLiter;
        this.excessFuelConsumptionPercentage = excessFuelConsumptionPercentage;
        this.anomalySeverity = anomalySeverity;
        this.rootCauseHypothesis = rootCauseHypothesis;
        this.recommendedAction = recommendedAction;
    }

    // Getters and Setters
    public Long getDriverId() { return driverId; }
    public void setDriverId(Long driverId) { this.driverId = driverId; }

    public String getDriverName() { return driverName; }
    public void setDriverName(String driverName) { this.driverName = driverName; }

    public Long getVehicleId() { return vehicleId; }
    public void setVehicleId(Long vehicleId) { this.vehicleId = vehicleId; }

    public String getVehiclePlate() { return vehiclePlate; }
    public void setVehiclePlate(String vehiclePlate) { this.vehiclePlate = vehiclePlate; }

    public String getVehicleModel() { return vehicleModel; }
    public void setModel(String vehicleModel) { this.vehicleModel = vehicleModel; }

    public Double getObservedEfficiencyKmPerLiter() { return observedEfficiencyKmPerLiter; }
    public void setObservedEfficiencyKmPerLiter(Double observedEfficiencyKmPerLiter) { this.observedEfficiencyKmPerLiter = observedEfficiencyKmPerLiter; }

    public Double getBenchmarkEfficiencyKmPerLiter() { return benchmarkEfficiencyKmPerLiter; }
    public void setBenchmarkEfficiencyKmPerLiter(Double benchmarkEfficiencyKmPerLiter) { this.benchmarkEfficiencyKmPerLiter = benchmarkEfficiencyKmPerLiter; }

    public Double getExcessFuelConsumptionPercentage() { return excessFuelConsumptionPercentage; }
    public void setExcessFuelConsumptionPercentage(Double excessFuelConsumptionPercentage) { this.excessFuelConsumptionPercentage = excessFuelConsumptionPercentage; }

    public String getAnomalySeverity() { return anomalySeverity; }
    public void setAnomalySeverity(String anomalySeverity) { this.anomalySeverity = anomalySeverity; }

    public String getRootCauseHypothesis() { return rootCauseHypothesis; }
    public void setRootCauseHypothesis(String rootCauseHypothesis) { this.rootCauseHypothesis = rootCauseHypothesis; }

    public String getRecommendedAction() { return recommendedAction; }
    public void setRecommendedAction(String recommendedAction) { this.recommendedAction = recommendedAction; }
}
