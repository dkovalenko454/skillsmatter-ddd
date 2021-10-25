import {Money} from "../Money/Money";

type Amount = number;
namespace Amount {
    export function empty(): Amount {
        return 0;
    }
}

export type CalculatePrice<Amount> = (pricePer: Money, amount: Amount, freeAmount?: Amount) => Money;

export type Duration = Amount;
export const DurationInMinutes = (duration: number): Duration => {
    return duration;
}

export type Mileage = Amount;
export const MileageInKilometres = (mileage: number): Mileage => {
    return mileage;
}

export const pricingEngine: CalculatePrice<Duration | Mileage> = (pricePer, amount, freeAmount = Amount.empty()) => {
    return pricePer.multiplyAndRound(Math.max(0, amount - freeAmount));
}
