package com.fleetlogistics.seed;

import com.fleetlogistics.modules.fleet.entity.*;
import com.fleetlogistics.modules.fleet.repository.*;
import com.fleetlogistics.modules.logistics.entity.*;
import com.fleetlogistics.modules.logistics.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final VehicleRepository vehicleRepository;
    private final DriverRepository driverRepository;
    private final FuelLogRepository fuelLogRepository;
    private final MaintenanceRecordRepository maintenanceRepository;
    private final ShipmentRepository shipmentRepository;
    private final TripScheduleRepository tripRepository;
    private final DeliveryStopRepository stopRepository;
    private final FailedDeliveryEventRepository failedEventRepository;

    public DataInitializer(VehicleRepository vehicleRepository,
                           DriverRepository driverRepository,
                           FuelLogRepository fuelLogRepository,
                           MaintenanceRecordRepository maintenanceRepository,
                           ShipmentRepository shipmentRepository,
                           TripScheduleRepository tripRepository,
                           DeliveryStopRepository stopRepository,
                           FailedDeliveryEventRepository failedEventRepository) {
        this.vehicleRepository = vehicleRepository;
        this.driverRepository = driverRepository;
        this.fuelLogRepository = fuelLogRepository;
        this.maintenanceRepository = maintenanceRepository;
        this.shipmentRepository = shipmentRepository;
        this.tripRepository = tripRepository;
        this.stopRepository = stopRepository;
        this.failedEventRepository = failedEventRepository;
    }

    @Override
    public void run(String... args) {
        if (vehicleRepository.count() > 0) {
            return; // Data already initialized
        }

        // 1. Seed Vehicles
        Vehicle v1 = vehicleRepository.save(new Vehicle("FL-9021", "Volvo FH16 750", Vehicle.VehicleType.HEAVY_TRUCK,
                Vehicle.VehicleStatus.IN_TRANSIT, 25000.0, "Diesel", 145200.0, 135000.0, LocalDate.of(2023, 2, 15)));
        Vehicle v2 = vehicleRepository.save(new Vehicle("FL-4412", "Mercedes-Benz Actros 1845", Vehicle.VehicleType.HEAVY_TRUCK,
                Vehicle.VehicleStatus.IN_TRANSIT, 22000.0, "Diesel", 98450.0, 122000.0, LocalDate.of(2023, 6, 10)));
        Vehicle v3 = vehicleRepository.save(new Vehicle("FL-1108", "Ford Transit 350 HD", Vehicle.VehicleType.DELIVERY_VAN,
                Vehicle.VehicleStatus.AVAILABLE, 4500.0, "Diesel", 42100.0, 48000.0, LocalDate.of(2024, 1, 20)));
        Vehicle v4 = vehicleRepository.save(new Vehicle("FL-7733", "Scania R500 V8", Vehicle.VehicleType.HEAVY_TRUCK,
                Vehicle.VehicleStatus.IN_TRANSIT, 24000.0, "Diesel", 215300.0, 142000.0, LocalDate.of(2022, 11, 5)));
        Vehicle v5 = vehicleRepository.save(new Vehicle("FL-3309", "Freightliner Cascadia", Vehicle.VehicleType.REFRIGERATED_TRUCK,
                Vehicle.VehicleStatus.MAINTENANCE, 20000.0, "Diesel", 188700.0, 155000.0, LocalDate.of(2022, 8, 12)));
        Vehicle v6 = vehicleRepository.save(new Vehicle("FL-5520", "Isuzu NPR-HD", Vehicle.VehicleType.DELIVERY_VAN,
                Vehicle.VehicleStatus.AVAILABLE, 6500.0, "Diesel", 67800.0, 54000.0, LocalDate.of(2023, 9, 30)));

        // 2. Seed Drivers
        Driver d1 = driverRepository.save(new Driver("Marcus Vance", "DL-8829103", "+1-555-0192", "m.vance@fleetops.com",
                Driver.DriverStatus.ON_DUTY, 4.9, 312, 12));
        d1.setAssignedVehicle(v1);
        driverRepository.save(d1);

        Driver d2 = driverRepository.save(new Driver("David Miller", "DL-4029112", "+1-555-0283", "d.miller@fleetops.com",
                Driver.DriverStatus.ON_DUTY, 4.1, 194, 6)); // High fuel anomaly driver
        d2.setAssignedVehicle(v4);
        driverRepository.save(d2);

        Driver d3 = driverRepository.save(new Driver("Elena Rostova", "DL-9938172", "+1-555-0374", "e.rostova@fleetops.com",
                Driver.DriverStatus.ON_DUTY, 4.8, 260, 9));
        d3.setAssignedVehicle(v2);
        driverRepository.save(d3);

        Driver d4 = driverRepository.save(new Driver("Samira Khan", "DL-1182736", "+1-555-0465", "s.khan@fleetops.com",
                Driver.DriverStatus.AVAILABLE, 4.7, 145, 4));
        d4.setAssignedVehicle(v3);
        driverRepository.save(d4);

        Driver d5 = driverRepository.save(new Driver("Carlos Mendez", "DL-6629184", "+1-555-0556", "c.mendez@fleetops.com",
                Driver.DriverStatus.OFF_DUTY, 4.6, 210, 8));
        d5.setAssignedVehicle(v5);
        driverRepository.save(d5);

        // 3. Seed Fuel Logs (including David Miller's anomalous efficiency)
        LocalDateTime now = LocalDateTime.now();
        fuelLogRepository.save(new FuelLog(v1, d1, now.minusDays(6), 280.0, 1120.0, 144200.0, "Allentown Pilot Center", 3.6));
        fuelLogRepository.save(new FuelLog(v1, d1, now.minusDays(2), 295.0, 1180.0, 145200.0, "Cleveland Travel Plaza", 3.4));
        fuelLogRepository.save(new FuelLog(v2, d3, now.minusDays(5), 240.0, 960.0, 97800.0, "Harrisburg Express Hub", 3.5));
        fuelLogRepository.save(new FuelLog(v2, d3, now.minusDays(1), 250.0, 1000.0, 98450.0, "Columbus Petro Station", 3.3));

        // David Miller on Scania R500 - Benchmark is ~3.3, but David gets only 2.1 km/L (Anomalous fuel loss!)
        fuelLogRepository.save(new FuelLog(v4, d2, now.minusDays(7), 350.0, 1435.0, 214600.0, "Indianapolis Speedway", 2.2));
        fuelLogRepository.save(new FuelLog(v4, d2, now.minusDays(3), 365.0, 1496.0, 215300.0, "Gary Truck Stop", 2.0));

        fuelLogRepository.save(new FuelLog(v3, d4, now.minusDays(4), 85.0, 340.0, 41800.0, "Queens Shell Terminal", 7.8));
        fuelLogRepository.save(new FuelLog(v5, d5, now.minusDays(8), 310.0, 1271.0, 188700.0, "Baltimore TA Travel", 3.1));

        // 4. Seed Maintenance Records (V4 & V5 have heavy maintenance expenses)
        maintenanceRepository.save(new MaintenanceRecord(v4, LocalDate.now().minusMonths(2),
                MaintenanceRecord.ServiceType.ENGINE_OVERHAUL, 7450.0, "Turbocharger replacement and injector recalibration",
                MaintenanceRecord.MaintenanceStatus.COMPLETED, 208000.0, 225000.0));
        maintenanceRepository.save(new MaintenanceRecord(v4, LocalDate.now().minusWeeks(3),
                MaintenanceRecord.ServiceType.BRAKE_REPAIR, 1850.0, "Heavy axle brake disc and pad replacement",
                MaintenanceRecord.MaintenanceStatus.COMPLETED, 214000.0, 230000.0));
        maintenanceRepository.save(new MaintenanceRecord(v5, LocalDate.now().minusDays(4),
                MaintenanceRecord.ServiceType.TRANSMISSION_SERVICE, 5200.0, "Refrigeration auxiliary compressor rebuild",
                MaintenanceRecord.MaintenanceStatus.IN_PROGRESS, 188700.0, 200000.0));
        maintenanceRepository.save(new MaintenanceRecord(v1, LocalDate.now().minusMonths(1),
                MaintenanceRecord.ServiceType.ROUTINE_INSPECTION, 650.0, "Quarterly DOT safety clearance and oil change",
                MaintenanceRecord.MaintenanceStatus.COMPLETED, 142000.0, 155000.0));
        maintenanceRepository.save(new MaintenanceRecord(v3, LocalDate.now().minusMonths(3),
                MaintenanceRecord.ServiceType.TIRE_REPLACEMENT, 980.0, "Four Michelin CrossClimate all-season tires",
                MaintenanceRecord.MaintenanceStatus.COMPLETED, 38000.0, 50000.0));

        // 5. Seed Shipments
        Shipment s1 = shipmentRepository.save(new Shipment("SHP-90412", "Apex Retailers Inc.",
                "Port of Newark, NJ", 40.6895, -74.1745,
                "Chicago Logistics Hub, IL", 41.8781, -87.6298,
                14200.0, Shipment.ShipmentPriority.CRITICAL, Shipment.ShipmentStatus.IN_TRANSIT,
                now.minusHours(18), now.plusHours(6), null));

        Shipment s2 = shipmentRepository.save(new Shipment("SHP-88319", "Global MedPharm Logistics",
                "Philadelphia Distribution Center, PA", 39.9526, -75.1652,
                "Boston Medical Warehouse, MA", 42.3601, -71.0589,
                8500.0, Shipment.ShipmentPriority.EXPRESS, Shipment.ShipmentStatus.DELAYED,
                now.minusHours(12), now.minusHours(1), null));

        Shipment s3 = shipmentRepository.save(new Shipment("SHP-77201", "Midwest Auto Parts Corp",
                "Detroit Component Plant, MI", 42.3314, -83.0458,
                "Columbus Assembly Hub, OH", 39.9612, -82.9988,
                16800.0, Shipment.ShipmentPriority.STANDARD, Shipment.ShipmentStatus.IN_TRANSIT,
                now.minusHours(8), now.plusHours(4), null));

        Shipment s4 = shipmentRepository.save(new Shipment("SHP-55104", "Metro Consumer Goods",
                "Brooklyn Fulfillment Center, NY", 40.6782, -73.9442,
                "North Bergen Cross-Dock, NJ", 40.8043, -74.0121,
                3800.0, Shipment.ShipmentPriority.STANDARD, Shipment.ShipmentStatus.FAILED,
                now.minusDays(1), now.minusHours(16), null));

        Shipment s5 = shipmentRepository.save(new Shipment("SHP-44092", "Keystone Electronics",
                "Baltimore Cargo Terminal, MD", 39.2904, -76.6122,
                "Pittsburgh Tech Depot, PA", 40.4406, -79.9959,
                9200.0, Shipment.ShipmentPriority.STANDARD, Shipment.ShipmentStatus.DELIVERED,
                now.minusDays(2), now.minusDays(1), now.minusDays(1).minusHours(2)));

        // 6. Seed Trip Schedules
        TripSchedule t1 = tripRepository.save(new TripSchedule("TRP-8801", v1, d1, "New York", "Chicago",
                now.minusHours(18), now.plusHours(6), null,
                41.2565, -81.5644, 88.5, TripSchedule.TripStatus.ACTIVE, 1280.0));

        TripSchedule t2 = tripRepository.save(new TripSchedule("TRP-8802", v2, d3, "Philadelphia", "Boston",
                now.minusHours(12), now.minusHours(1), null,
                41.5120, -72.8240, 32.0, TripSchedule.TripStatus.DELAYED, 510.0));

        TripSchedule t3 = tripRepository.save(new TripSchedule("TRP-8803", v4, d2, "Detroit", "Columbus",
                now.minusHours(8), now.plusHours(4), null,
                40.7580, -83.1250, 92.0, TripSchedule.TripStatus.ACTIVE, 330.0));

        // 7. Seed Stops
        stopRepository.save(new DeliveryStop(t1, s1, 1, "Port of Newark Gate 4", "Newark", 40.6895, -74.1745,
                DeliveryStop.StopType.PICKUP, DeliveryStop.StopStatus.COMPLETED, now.minusHours(18), now.minusHours(17), null));
        stopRepository.save(new DeliveryStop(t1, s1, 2, "Cleveland Intermediate Terminal", "Cleveland", 41.4993, -81.6944,
                DeliveryStop.StopType.WAYPOINT, DeliveryStop.StopStatus.COMPLETED, now.minusHours(6), now.minusHours(5), null));
        stopRepository.save(new DeliveryStop(t1, s1, 3, "Chicago O'Hare Air Freight Dock 7", "Chicago", 41.8781, -87.6298,
                DeliveryStop.StopType.DROPOFF, DeliveryStop.StopStatus.PENDING, now.plusHours(6), null, null));

        stopRepository.save(new DeliveryStop(t2, s2, 1, "Philly Pharma Depot", "Philadelphia", 39.9526, -75.1652,
                DeliveryStop.StopType.PICKUP, DeliveryStop.StopStatus.COMPLETED, now.minusHours(12), now.minusHours(11), null));
        stopRepository.save(new DeliveryStop(t2, s2, 2, "Hartford Express Waypoint", "Hartford", 41.7658, -72.6734,
                DeliveryStop.StopType.WAYPOINT, DeliveryStop.StopStatus.COMPLETED, now.minusHours(4), now.minusHours(3), "I-84 Severe Congestion"));
        stopRepository.save(new DeliveryStop(t2, s2, 3, "Boston Longwood Medical Depot", "Boston", 42.3601, -71.0589,
                DeliveryStop.StopType.DROPOFF, DeliveryStop.StopStatus.PENDING, now.minusHours(1), null, "Port Authority Gate Access Hold"));

        // 8. Seed Failed Delivery Events (Creating recurring delay hotspots)
        failedEventRepository.save(new FailedDeliveryEvent(s4, null, now.minusHours(16),
                FailedDeliveryEvent.FailureReason.ACCESS_RESTRICTED, "North Bergen Cross-Dock Gate B",
                40.8043, -74.0121, "Security clearance badge mismatch at terminal intake.", false));

        failedEventRepository.save(new FailedDeliveryEvent(s4, null, now.minusDays(3),
                FailedDeliveryEvent.FailureReason.TRAFFIC_CONGESTION, "North Bergen Cross-Dock Gate B",
                40.8043, -74.0121, "Tunnel bottleneck caused 4-hour delay past receiver business hours.", true));

        failedEventRepository.save(new FailedDeliveryEvent(s2, t2, now.minusDays(2),
                FailedDeliveryEvent.FailureReason.CUSTOMER_UNAVAILABLE, "Downtown Boston Commercial District",
                42.3555, -71.0601, "Receiving dock unmanned after 17:00.", true));
    }
}
