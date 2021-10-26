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

    add(other: money): Money {
        if (this.currency !== other.currency) {
            throw new Error("Adding different currencies is not supported");
        } else {
            return new money(this.amountInCents + other.amountInCents, this.currency);
        }
    }
}

export type Money = {
    equalTo(other: Money): boolean;
    multiplyAndRound(by: number): Money;
    add(other: Money): Money;
}

export function EUR(amountInCents: number): Money {
    return new money(amountInCents, Currency.Euro);
}

export function USD(amountInCents: number): Money {
    return new money(amountInCents, Currency.UnitedStatesDollar);
}
