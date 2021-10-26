import {Money} from "../Money/Money";
import {Amount, Duration, Mileage, Trip} from "../Trip/Trip";

export type CalculatePrice = (pricePerOne: Money, amount: Amount, freeAmount?: Amount) => Money;
export const pricingEngine: CalculatePrice = (pricePerOne, amount, freeAmount = Amount.empty()) => {
    return pricePerOne.multiplyAndRound(Math.max(0, amount - freeAmount));
}

export type Tariff = {
    pricePerKm: Money;
    pricePerMinute: Money;
}

export type RentalPackage = {
    mileageAllowance: Mileage;
    durationAllowance: Duration;
};

// todo should rentalPackage be optional?
export type CalculateTripPrice = (tripTariff: Tariff, trip: Trip, rentalPackage: RentalPackage) => Money;
export const tripPricingEngine: CalculateTripPrice = (tripTariff: Tariff, trip: Trip, rentalPackage: RentalPackage) => {
    const mileagePrice = pricingEngine(tripTariff.pricePerKm, trip.mileage, rentalPackage.mileageAllowance);
    const durationPrice = pricingEngine(tripTariff.pricePerMinute, trip.duration, rentalPackage.durationAllowance);

    return durationPrice;
    // todo
    //return mileagePrice.add(durationPrice);
}
