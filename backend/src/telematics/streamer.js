/**
 * Vehicle OBD-II & GPS Real-Time Telemetry Streaming Engine
 * Generates calibrated OBD-II PID telemetry frames (RPM, Speed, Fuel, Coolant Temp, Throttle)
 * and evaluates real-time driving behavior events (harsh braking, overspeeding, DTC codes).
 */

export const OBD_PIDS = {
  ENGINE_RPM: '0x0C',
  VEHICLE_SPEED: '0x0D',
  COOLANT_TEMP: '0x05',
  FUEL_LEVEL: '0x2F',
  THROTTLE_POS: '0x11',
  ENGINE_LOAD: '0x04'
};

export class TelematicsStreamer {
  /**
   * @param {Object} [options]
   * @param {string} [options.vehicleId='TRUCK-01'] - Unique vehicle VIN/ID
   * @param {Object} [options.initialLocation] - Start GPS { lat, lon }
   */
  constructor(options = {}) {
    this.vehicleId = options.vehicleId || 'TRUCK-01';
    this.location = options.initialLocation || { lat: 37.7749, lon: -122.4194 };
    this.speedKmh = 65;
    this.rpm = 1850;
    this.fuelLevelPct = 82.5;
    this.coolantTempC = 88;
    this.odometerKm = 45210.4;
    this.activeDtcCodes = [];
  }

  /**
   * Generate next telemetry frame tick
   * @param {Object} [drivingContext] - Optional driving events { harshBraking, accelerate, idle }
   * @returns {Object} Structured OBD-II and GPS telemetry packet
   */
  generateTick(drivingContext = {}) {
    const timestamp = new Date().toISOString();

    // 1. Simulate dynamics
    if (drivingContext.harshBraking) {
      this.speedKmh = Math.max(0, this.speedKmh - 35);
      this.rpm = Math.max(800, this.rpm - 1200);
    } else if (drivingContext.accelerate) {
      this.speedKmh = Math.min(120, this.speedKmh + 15);
      this.rpm = Math.min(3500, this.rpm + 600);
    } else if (drivingContext.idle) {
      this.speedKmh = 0;
      this.rpm = 750;
    } else {
      // Normal cruising jitter
      this.speedKmh = Math.max(0, Math.min(110, this.speedKmh + (Math.random() - 0.5) * 4));
      this.rpm = Math.max(800, Math.min(3000, this.rpm + (Math.random() - 0.5) * 80));
    }

    // 2. Incremental fuel consumption & distance
    const hoursElapsed = 1 / 3600; // 1 second tick
    const distanceKm = (this.speedKmh * hoursElapsed);
    this.odometerKm += distanceKm;
    this.fuelLevelPct = Math.max(0, this.fuelLevelPct - (distanceKm * 0.03));

    // 3. Move GPS along vector
    this.location.lat += (this.speedKmh > 0 ? 0.00015 : 0);
    this.location.lon += (this.speedKmh > 0 ? 0.00010 : 0);

    // 4. Coolant temperature equilibrium
    this.coolantTempC = Math.min(105, Math.max(80, this.coolantTempC + (this.rpm > 2500 ? 0.4 : -0.1)));

    // 5. Behavioral event classification
    const events = [];
    if (drivingContext.harshBraking || this.speedKmh < 20 && drivingContext.wasFast) {
      events.push('HARSH_BRAKING_EVENT');
    }
    if (this.speedKmh > 100) {
      events.push('SPEED_VIOLATION_OVERSPEED');
    }
    if (this.coolantTempC > 100) {
      events.push('ENGINE_OVERHEAT_WARNING');
    }

    return {
      vehicleId: this.vehicleId,
      timestamp,
      gps: {
        latitude: Number(this.location.lat.toFixed(6)),
        longitude: Number(this.location.lon.toFixed(6)),
        headingDegrees: 45,
        odometerKm: Number(this.odometerKm.toFixed(2))
      },
      obd2: {
        speedKmh: Math.round(this.speedKmh),
        engineRpm: Math.round(this.rpm),
        fuelLevelPercentage: Number(this.fuelLevelPct.toFixed(2)),
        coolantTemperatureCelsius: Math.round(this.coolantTempC),
        engineLoadPct: Math.round((this.rpm / 3500) * 100),
        throttlePositionPct: Math.round((this.speedKmh / 120) * 100)
      },
      diagnostics: {
        checkEngineLight: this.coolantTempC > 102,
        activeDtcCodes: this.activeDtcCodes
      },
      safetyEvents: events
    };
  }

  /**
   * Inject Diagnostic Trouble Code (DTC)
   */
  injectDtc(code) {
    if (!this.activeDtcCodes.includes(code)) {
      this.activeDtcCodes.push(code);
    }
  }

  clearDtcs() {
    this.activeDtcCodes = [];
  }
}

export default TelematicsStreamer;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TelematicsStreamer;
  module.exports.TelematicsStreamer = TelematicsStreamer;
  module.exports.OBD_PIDS = OBD_PIDS;
}
