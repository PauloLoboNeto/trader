import { CoachMarkModel } from './model/coachmark.model';
import { Component, QueryList, Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CMDirective } from './directive/cmDirective.directive';

@Component({
    selector: 'app-coachmark-component',
    templateUrl: './componentowner.component.html',
    styleUrls: ['./componentowner.component.css']

})
export class CoachMarkComponent {
    model = [];
    position = 0;
    prevElement: ElementRef;
    top: string;
    left: string;
    constructor(private render: Renderer2, cd: ChangeDetectorRef) { }

    addElements(elements: QueryList<CMDirective>) {
        this.model = elements.toArray();
    }

    init() {
        const el = this.model[this.position].el;
        this.focusOnCoachMarkElement(el);
        this.showPopup();
    }

    // prev == -1, prox == 1
    prevNext(value: number) {
        this.position += value;
        const el = this.model[this.position].el;
        this.focusOnCoachMarkElement(el);
        this.showPopup();
    }

    focusOnCoachMarkElement(el: ElementRef) {
        this.top = Math.round(el.nativeElement.getBoundingClientRect().bottom) + 'px';
        this.left = Math.round(el.nativeElement.getBoundingClientRect().right - (el.nativeElement.getBoundingClientRect().width / 2)) + 'px';
        window.parent.scroll(0, el.nativeElement.getBoundingClientRect().top);
    }

    getTop() {
        console.log(this.top);
        return this.top;
    }

    getLeft() {
        console.log(this.left);
        return this.left;
    }

    showPopup() {

    }

}
