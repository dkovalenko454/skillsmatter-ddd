import {Expect, Test, TestCase} from 'alsatian';
import {pricingEngine, RentalPackage} from "./PricingEngine";
import {EUR, Money} from "../Money/Money";
import {Duration, DurationInMinutes, Mileage, MileageInKilometres, Trip} from "../Trip/Trip";

export class PricingEngineSpec {
    @Test()
    @TestCase(EUR(30), DurationInMinutes(1), EUR(30))
    @TestCase(EUR(30), DurationInMinutes(3), EUR(90))
    @TestCase(EUR(23), DurationInMinutes(12), EUR(276))
    CalculatePrice_charged_per_minute(pricePerMinute: Money, duration: Duration, totalPrice: Money) {
        const actual = pricingEngine(pricePerMinute, duration);
        const expected = totalPrice;

        Expect(actual.equalTo(expected)).toBe(true);
    }

    @Test()
    // no free minutes - default
    @TestCase(EUR(30), DurationInMinutes(3), DurationInMinutes(0), EUR(90))
    // duration > free minutes
    @TestCase(EUR(30), DurationInMinutes(20), DurationInMinutes(10), EUR(300))
    // duration < free minutes
    @TestCase(EUR(30), DurationInMinutes(5), DurationInMinutes(10), EUR(0))
    // duration == free minutes
    @TestCase(EUR(30), DurationInMinutes(10), DurationInMinutes(10), EUR(0))
    CalculatePrice_extended_reservation_charged_per_minute(pricePerMinute: Money, duration: Duration, freeMinutes: Duration, totalPrice: Money) {
        const actual = pricingEngine(pricePerMinute, duration, freeMinutes);
        const expected = totalPrice;

        Expect(actual.equalTo(expected)).toBe(true);
    }

    @Test()
    // no free mileage - default
    @TestCase(EUR(10), MileageInKilometres(120), MileageInKilometres(0), EUR(1200))
    // mileage > free mileage
    @TestCase(EUR(10), MileageInKilometres(120), MileageInKilometres(100), EUR(200))
    // mileage < free mileage
    @TestCase(EUR(10), MileageInKilometres(60), MileageInKilometres(100), EUR(0))
    // mileage == free mileage
    @TestCase(EUR(10), MileageInKilometres(100), MileageInKilometres(100), EUR(0))
    CalculatePrice_extra_mileage_charged_per_km(pricePerKm: Money, mileage: Mileage, freeMileage: Mileage, totalPrice: Money) {
        const actual = pricingEngine(pricePerKm, mileage, freeMileage);
        const expected = totalPrice;

        Expect(actual.equalTo(expected)).toBe(true);
    }

    @Test()
    @TestCase(EUR(10), EUR(20),
      {mileage: MileageInKilometres(50), duration: DurationInMinutes(60)},
      {mileageAllowance: MileageInKilometres(0), durationAllowance: DurationInMinutes(0)},
      EUR(1700))
    CalculatePrice_trip_price_using_package(pricePerKm: Money, pricePerMinute: Money, trip: Trip, rentalPackage: RentalPackage, totalPrice: Money) {
        const actual = pricingEngine(pricePerKm, trip.duration, rentalPackage.durationAllowance);
        const expected = totalPrice;

        Expect(actual.equalTo(expected)).toBe(true);
    }
}
