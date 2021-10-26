import {Money} from "../Money/Money";
import {Amount, Duration, Mileage} from "../Trip/Trip";

export type RentalPackage = {
    mileageAllowance: Mileage;
    durationAllowance: Duration;
};

export type CalculatePrice<Amount> = (pricePerOne: Money, amount: Amount, freeAmount?: Amount) => Money;
export const pricingEngine: CalculatePrice<Duration | Mileage> = (pricePerOne, amount, freeAmount = Amount.empty()) => {
    return pricePerOne.multiplyAndRound(Math.max(0, amount - freeAmount));
}
