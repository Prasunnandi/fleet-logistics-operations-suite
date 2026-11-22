package com.fleetlogistics.modules.logistics.service;

import com.fleetlogistics.modules.logistics.entity.*;
import com.fleetlogistics.modules.logistics.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LogisticsService {

    private final ShipmentRepository shipmentRepository;
    private final TripScheduleRepository tripRepository;
    private final DeliveryStopRepository stopRepository;
    private final FailedDeliveryEventRepository failedEventRepository;

    public LogisticsService(ShipmentRepository shipmentRepository,
                            TripScheduleRepository tripRepository,
                            DeliveryStopRepository stopRepository,
                            FailedDeliveryEventRepository failedEventRepository) {
        this.shipmentRepository = shipmentRepository;
        this.tripRepository = tripRepository;
        this.stopRepository = stopRepository;
        this.failedEventRepository = failedEventRepository;
    }

    // Shipment operations
    public List<Shipment> getAllShipments() {
        return shipmentRepository.findAll();
    }

    public Optional<Shipment> getShipmentByTrackingNumber(String trackingNumber) {
        return shipmentRepository.findByTrackingNumber(trackingNumber);
    }

    public Shipment createShipment(Shipment shipment) {
        if (shipment.getStatus() == null) {
            shipment.setStatus(Shipment.ShipmentStatus.CREATED);
        }
        return shipmentRepository.save(shipment);
    }

    public Shipment updateShipmentStatus(Long id, Shipment.ShipmentStatus status) {
        Shipment shipment = shipmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Shipment not found: " + id));
        shipment.setStatus(status);
        if (status == Shipment.ShipmentStatus.DELIVERED) {
            shipment.setActualArrival(LocalDateTime.now());
        }
        return shipmentRepository.save(shipment);
    }

    // Trip operations
    public List<TripSchedule> getAllTrips() {
        return tripRepository.findAll();
    }

    public List<TripSchedule> getActiveTrips() {
        return tripRepository.findByStatus(TripSchedule.TripStatus.ACTIVE);
    }

    public TripSchedule createTrip(TripSchedule trip) {
        return tripRepository.save(trip);
    }

    public TripSchedule updateTripCoordinates(Long id, Double lat, Double lng, Double speedKmh) {
        TripSchedule trip = tripRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Trip not found: " + id));
        trip.setCurrentLat(lat);
        trip.setCurrentLng(lng);
        trip.setCurrentSpeedKmh(speedKmh);
        return tripRepository.save(trip);
    }

    // Delivery Stops
    public List<DeliveryStop> getStopsForTrip(Long tripId) {
        return stopRepository.findByTripScheduleIdOrderBySequenceIndexAsc(tripId);
    }

    public DeliveryStop createDeliveryStop(DeliveryStop stop) {
        return stopRepository.save(stop);
    }

    // Failed Delivery Handling
    public List<FailedDeliveryEvent> getAllFailedEvents() {
        return failedEventRepository.findAll();
    }

    public FailedDeliveryEvent recordFailedDelivery(FailedDeliveryEvent event) {
        Shipment shipment = event.getShipment();
        if (shipment != null) {
            shipment.setStatus(Shipment.ShipmentStatus.FAILED);
            shipmentRepository.save(shipment);
        }
        return failedEventRepository.save(event);
    }

    public FailedDeliveryEvent scheduleRetry(Long eventId, String notes) {
        FailedDeliveryEvent event = failedEventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found: " + eventId));
        event.setRetryScheduled(true);
        event.setResolutionNotes(notes);
        if (event.getShipment() != null) {
            event.getShipment().setStatus(Shipment.ShipmentStatus.ASSIGNED);
            shipmentRepository.save(event.getShipment());
        }
        return failedEventRepository.save(event);
    }
}
