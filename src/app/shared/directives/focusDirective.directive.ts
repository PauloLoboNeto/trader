import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[focused]'
})

export class FocusedDirective {

    @Input()
    set focused(value: boolean) {
        if (value) {
            this.renderer.selectRootElement(this.elementRef.nativeElement, true).scrollIntoView();
        }
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
}
