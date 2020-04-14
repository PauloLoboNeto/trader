export class Card {
    abreviationName: string;
    name: string;
    value: string;
    porcentage: string;
    minimo: string;
    maximo: string;
    date: string;
    dateTime: string;
}

export class Cards {
    cards: Card[] = new Array<Card>();
}
