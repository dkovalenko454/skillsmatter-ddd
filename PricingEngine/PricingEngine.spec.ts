import {Expect, Test, TestCase} from 'alsatian';
import {pricingEngine, RentalPackage, Tariff, tripPricingEngine} from "./PricingEngine";
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
    // no allowance in rental package
    @TestCase(
      new Tariff(EUR(10), EUR(20)),
      new Trip(MileageInKilometres(50), DurationInMinutes(60)),
      new RentalPackage(MileageInKilometres(0), DurationInMinutes(0), EUR(1000)),
      EUR(2700))
    // duration allowance in rental package
    @TestCase(
      new Tariff(EUR(10), EUR(20)),
      new Trip(MileageInKilometres(50), DurationInMinutes(60)),
      new RentalPackage(MileageInKilometres(0), DurationInMinutes(30), EUR(1000)),
      EUR(2100))
    // mileage allowance in rental package
    @TestCase(
      new Tariff(EUR(10), EUR(20)),
      new Trip(MileageInKilometres(50), DurationInMinutes(60)),
      new RentalPackage(MileageInKilometres(30), DurationInMinutes(0), EUR(1000)),
      EUR(2400))
    // duration and mileage allowance in rental package
    @TestCase(
      new Tariff(EUR(10), EUR(20)),
      new Trip(MileageInKilometres(50), DurationInMinutes(60)),
      new RentalPackage(MileageInKilometres(30), DurationInMinutes(30), EUR(1000)),
      EUR(1800))
    // duration and mileage allowance greater than trip
    @TestCase(
      new Tariff(EUR(10), EUR(20)),
      new Trip(MileageInKilometres(50), DurationInMinutes(60)),
      new RentalPackage(MileageInKilometres(50), DurationInMinutes(60), EUR(1000)),
      EUR(1000))
    CalculatePrice_trip_price_using_package(tripTariff: Tariff, trip: Trip, rentalPackage: RentalPackage, totalPrice: Money) {
        const actual = tripPricingEngine(tripTariff, trip, rentalPackage);
        const expected = totalPrice;

        Expect(actual.equalTo(expected)).toBe(true);
    }
}
