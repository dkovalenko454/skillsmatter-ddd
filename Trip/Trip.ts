// todo do we need Amount?
type Nominal<T> = T & { readonly '': unique symbol };
export type Amount = Nominal<number>;
export namespace Amount {
  export function empty(): Amount {
    return 0 as Amount;
  }
}

export type Duration = Amount;
export const DurationInMinutes = (duration: number): Duration => duration as Duration;

export type Mileage = Amount;
export const MileageInKilometres = (mileage: number): Mileage => mileage as Mileage;

export class Trip {
  constructor(public mileage: Mileage, public duration: Duration) {}
}