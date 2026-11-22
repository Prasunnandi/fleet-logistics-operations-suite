package com.fleetlogistics.modules.analytics.controller;

import com.fleetlogistics.modules.analytics.dto.*;
import com.fleetlogistics.modules.analytics.service.FleetIntelligenceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/analytics")
@Tag(name = "Logistics Performance & Anomaly Intelligence", description = "Endpoints for identifying expensive vehicles, inefficient routes, recurring delay hotspots, and fuel burn anomalies")
public class AnalyticsController {

    private final FleetIntelligenceService intelligenceService;

    public AnalyticsController(FleetIntelligenceService intelligenceService) {
        this.intelligenceService = intelligenceService;
    }

    @GetMapping("/overview")
    @Operation(summary = "Get high-level executive KPI metrics across fleet and logistics")
    public ResponseEntity<ExecutiveOverviewDto> getOverview() {
        return ResponseEntity.ok(intelligenceService.getExecutiveOverview());
    }

    @GetMapping("/vehicles/cost-ranking")
    @Operation(summary = "Rank vehicles by Total Cost of Ownership (Fuel + Maintenance + Cost per km)")
    public ResponseEntity<List<VehicleCostRankingDto>> getVehicleCostRanking() {
        return ResponseEntity.ok(intelligenceService.getVehicleCostRanking());
    }

    @GetMapping("/fuel/anomalies")
    @Operation(summary = "Detect drivers and vehicles with unusual fuel consumption vs benchmark")
    public ResponseEntity<List<FuelAnomalyAlertDto>> getFuelAnomalies() {
        return ResponseEntity.ok(intelligenceService.detectUnusualFuelConsumption());
    }

    @GetMapping("/routes/efficiency")
    @Operation(summary = "Analyze corridor reliability, on-time percentage, and identify bottleneck routes")
    public ResponseEntity<List<RouteEfficiencyDto>> getRouteEfficiency() {
        return ResponseEntity.ok(intelligenceService.getRouteEfficiencyAnalytics());
    }

    @GetMapping("/delay-hotspots")
    @Operation(summary = "Cluster and rank geographic locations prone to recurrent delivery delays or failures")
    public ResponseEntity<List<DelayHotspotDto>> getDelayHotspots() {
        return ResponseEntity.ok(intelligenceService.getDelayHotspots());
    }
}
