export class Elements {
    id: string;
    title: string;
    content: string;
    placement: string;
}

export class CoachMarkModel {
    elementId: HTMLElement;
    title: string;
    content: string;
    placement: string;
    positionPopover: Position;
    positionArrow: Position;
}

export class Position {
    top: string;
    left: string;

    constructor(top: string, left: string) {
        this.top = top;
        this.left = left;
    }
}

export enum Place {
    TOP = 'top',
    BOTTOM = 'bottom',
    LEFT = 'left',
    RIGHT = 'right'
}
