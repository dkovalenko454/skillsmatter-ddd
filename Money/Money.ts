export enum Currency {
    Euro = "EUR",
    UnitedStatesDollar = "USD"
}

class money implements Money {
    constructor(
        readonly amountInCents: number,
        readonly currency: Currency
    ) {}

    equalTo(other: money): boolean {
        return other.amountInCents === this.amountInCents && other.currency === this.currency;
    }

    multiplyAndRound(by: number): Money {
        return new money(Math.round(this.amountInCents * by), this.currency);
    }
}

export type Money = {
    equalTo(other: Money): boolean;
    multiplyAndRound(by: number): Money;
}

export function EUR(amountInCents: number): Money {
    return new money(amountInCents, Currency.Euro);
}

export function USD(amountInCents: number): Money {
    return new money(amountInCents, Currency.UnitedStatesDollar);
}
