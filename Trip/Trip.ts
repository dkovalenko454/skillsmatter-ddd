// todo do we need Amount?
export type Amount = number;
export namespace Amount {
  export function empty(): Amount {
    return 0;
  }
}

export type Duration = Amount;
export const DurationInMinutes = (duration: number): Duration => duration;

export type Mileage = Amount;
export const MileageInKilometres = (mileage: number): Mileage => mileage;

export class Trip {
  constructor(public mileage: Mileage, public duration: Duration) {}
}