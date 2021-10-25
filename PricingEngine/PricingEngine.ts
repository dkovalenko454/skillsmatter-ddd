import {Money} from "../Money/Money";

export type Duration = number;
export type CalculatePrice = (pricePerMinute: Money, durationInMinutes: Duration, freeMinutes?: Duration) => Money;

export const DurationInMinutes = (duration: number): Duration => {
    return duration;
}

export const pricingEngine: CalculatePrice = (pricePerMinute, durationInMinutes, freeMinutes: Duration = DurationInMinutes(0)) => {
    return pricePerMinute.multiplyAndRound(Math.max(0, durationInMinutes - freeMinutes));
}
