import { ElementRef, Directive } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[cm]'
})
export class CMDirective {
    constructor(private el: ElementRef) { }
}
