export class Element {
    id: string;
    title: string;
    content: string;
    placement: string;
    height: number;
    width: number;
}

export class CoachMarkModel {
    elementId: HTMLElement;
    title: string;
    content: string;
    placement: string;
    top: number;
    left: number;
    height: number;
    width: number;
}


export enum Place {
    TOP = 'top',
    BOTTOM = 'bottom',
    LEFT = 'left',
    RIGHT = 'right'
}
