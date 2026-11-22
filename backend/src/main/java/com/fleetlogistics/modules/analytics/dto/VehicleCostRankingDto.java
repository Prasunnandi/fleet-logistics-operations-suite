package com.fleetlogistics.modules.analytics.dto;

public class VehicleCostRankingDto {
    private Long vehicleId;
    private String plateNumber;
    private String model;
    private String vehicleType;
    private Double currentMileageKm;
    private Double totalFuelCost;
    private Double totalMaintenanceCost;
    private Double totalOperatingExpense;
    private Double costPerKm;
    private String expenseSeverity; // NORMAL, HIGH, CRITICAL_EXPENSE

    public VehicleCostRankingDto() {}

    public VehicleCostRankingDto(Long vehicleId, String plateNumber, String model, String vehicleType,
                                 Double currentMileageKm, Double totalFuelCost, Double totalMaintenanceCost,
                                 Double totalOperatingExpense, Double costPerKm, String expenseSeverity) {
        this.vehicleId = vehicleId;
        this.plateNumber = plateNumber;
        this.model = model;
        this.vehicleType = vehicleType;
        this.currentMileageKm = currentMileageKm;
        this.totalFuelCost = totalFuelCost;
        this.totalMaintenanceCost = totalMaintenanceCost;
        this.totalOperatingExpense = totalOperatingExpense;
        this.costPerKm = costPerKm;
        this.expenseSeverity = expenseSeverity;
    }

    // Getters and Setters
    public Long getVehicleId() { return vehicleId; }
    public void setVehicleId(Long vehicleId) { this.vehicleId = vehicleId; }

    public String getPlateNumber() { return plateNumber; }
    public void setPlateNumber(String plateNumber) { this.plateNumber = plateNumber; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }

    public Double getCurrentMileageKm() { return currentMileageKm; }
    public void setCurrentMileageKm(Double currentMileageKm) { this.currentMileageKm = currentMileageKm; }

    public Double getTotalFuelCost() { return totalFuelCost; }
    public void setTotalFuelCost(Double totalFuelCost) { this.totalFuelCost = totalFuelCost; }

    public Double getTotalMaintenanceCost() { return totalMaintenanceCost; }
    public void setTotalMaintenanceCost(Double totalMaintenanceCost) { this.totalMaintenanceCost = totalMaintenanceCost; }

    public Double getTotalOperatingExpense() { return totalOperatingExpense; }
    public void setTotalOperatingExpense(Double totalOperatingExpense) { this.totalOperatingExpense = totalOperatingExpense; }

    public Double getCostPerKm() { return costPerKm; }
    public void setCostPerKm(Double costPerKm) { this.costPerKm = costPerKm; }

    public String getExpenseSeverity() { return expenseSeverity; }
    public void setExpenseSeverity(String expenseSeverity) { this.expenseSeverity = expenseSeverity; }
}
