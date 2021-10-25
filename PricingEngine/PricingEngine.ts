import {Money} from "../Money/Money";

type Amount = number;
namespace Amount {
    export function empty(): Amount {
        return 0;
    }
}

export type Duration = Amount;
export const DurationInMinutes = (duration: number): Duration => duration;

export type Mileage = Amount;
export const MileageInKilometres = (mileage: number): Mileage => mileage;

export type CalculatePrice<Amount> = (pricePer: Money, amount: Amount, freeAmount?: Amount) => Money;
export const pricingEngine: CalculatePrice<Duration | Mileage> = (pricePerOne, amount, freeAmount = Amount.empty()) => {
    return pricePerOne.multiplyAndRound(Math.max(0, amount - freeAmount));
}
