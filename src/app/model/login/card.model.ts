export class CardModel {
    private abreviationName: string;
    private name: string;
    private value: string;
    private porcentage: string;
    private min: string;
    private max: string;
    private date: string;
    private dateTime: string;

    getAbreviationName() {
        return this.abreviationName;
    }

    getName() {
        return this.name;
    }

    getValue() {
        return this.value;
    }

    getPorcentage() {
        return this.porcentage;
    }

    getMin() {
        return this.min;
    }

    getMax() {
        return this.max;
    }

    getDate() {
        return this.date;
    }

    getDateTime() {
        return this.dateTime;
    }

    setAbreviationName(value: string) {
        this.abreviationName = value;
    }

    setName(value: string) {
        this.name = value;
    }

    setValue(value: string) {
        this.value = value;
    }

    setPorcentage(value: string) {
        this.porcentage = value;
    }

    setMin(value: string) {
        this.min = value;
    }

    setMax(value: string) {
        this.max = value;
    }

    setDate(value: string) {
        this.date = value;
    }

    setDateTime(value: string) {
        this.dateTime = value;
    }
}
