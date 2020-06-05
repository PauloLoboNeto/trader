export class Element {
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
    zIndex: string;
    display: string;
}


export enum Place {
    TOP = 'top',
    BOTTOM = 'bottom',
    LEFT = 'left',
    RIGHT = 'right'
}
