import { CoachMarkModel, Element, Place, Dimension } from './model/coachmark.model';
import { Component, Renderer2, Input, OnInit, NgZone, OnChanges, ViewEncapsulation } from '@angular/core';
import { CdkFixedSizeVirtualScroll } from '@angular/cdk/scrolling';

@Component({
    selector: 'app-coachmark-component',
    templateUrl: './componentowner.component.html',
    styleUrls: ['./componentowner.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CoachMarkComponent implements OnInit, OnChanges {

    @Input() elements: Element[];
    position = 0;
    prevElement: CoachMarkModel = new CoachMarkModel();
    actualElement: CoachMarkModel = new CoachMarkModel();

    constructor(private render: Renderer2, private ngZone: NgZone) { }

    ngOnInit() {
        this.first();
    }

    ngOnChanges() {
        window.onresize = (e: any) => {
            this.ngZone.run(() => {
                this.actualElement = this.getElement(this.position);
            });
        };
    }

    first() {
        this.actualElement = this.getElement(this.position);
        this.applyClassOnElementActive(true);
        this.focus();
    }

    prev() {
        this.prevElement = this.getElement(this.position);
        this.position += -1;
        this.actualElement = this.getElement(this.position);
        this.applyClassOnElementActive(false);
        this.focus();
    }

    next() {
        this.prevElement = this.getElement(this.position);
        this.position += 1;
        this.actualElement = this.getElement(this.position);
        this.applyClassOnElementActive(false);
        this.focus();
    }

    focus() {
        const math = Math.round(this.actualElement.elementId.getBoundingClientRect().top
            + window.scrollY);
        window.scroll({
            top: math,
            behavior: 'smooth'
        });
    }

    getTopBackgroundStepActive(): string {
        return `${Math.round(this.actualElement.elementId.getBoundingClientRect().top + window.scrollY)}px`;
    }

    getLeftBackgroundStepActive(): string {
        return `${Math.round(this.actualElement.elementId.getBoundingClientRect().left + window.scrollX)}px`;
    }

    getWidthBackgroundStepActive(): string {
        return `${Math.round(this.actualElement.elementId.getBoundingClientRect().width)}px`;
    }

    getHeightBackgroundStepActive(): string {
        return `${Math.round(this.actualElement.elementId.getBoundingClientRect().height)}px`;
    }

    getLeftArrow(): string {
        const popove = document.getElementById('popove');
        switch (this.actualElement.placement) {
            case Place.BOTTOM:
            case Place.TOP:
                return '44%';
            case Place.LEFT:
                return Math.round(popove.getBoundingClientRect().width - 3) + 'px';
            case Place.RIGHT:
                return '-19px';
        }
    }

    getTopArrow(): string {
        const popove = document.getElementById('popove');
        switch (this.actualElement.placement) {
            case Place.BOTTOM:
                return '-19' + 'px';
            case Place.TOP:
                return Math.round(popove.getBoundingClientRect().height) - 3 + 'px';
            case Place.LEFT:
            case Place.RIGHT:
                return '44%';
        }
    }

    getHeightPopove(): string {
        return `${this.actualElement.height}px`;
    }

    getWidthPopove(): string {
        const widthPopover = this.calcSizePopover(this.actualElement.width, Dimension.WIDTH);
        return `${widthPopover}px`;
    }

    getTopPopove(): string {
        return `${this.actualElement.top}px`;
    }

    getLeftPopove(): string {
        return `${this.actualElement.left}px`;
    }

    showButtonNext(): boolean {
        if (this.elements.length > 0 && this.position < this.elements.length - 1) {
            return true;
        }
    }

    finalizar() {
        console.log('finalizar');
    }

    private getElement(index: number): CoachMarkModel {
        const popove = document.getElementById('popove');
        const element: CoachMarkModel = new CoachMarkModel();
        element.elementId = document.getElementById(this.elements[index].id);
        element.width = this.elements[index].width;
        element.height = this.elements[index].height;
        element.content = this.elements[index].content;
        element.placement = this.elements[index].placement;
        element.title = this.elements[index].title;
        element.top = this.calcTop(element.elementId, element.height, element.placement);
        element.left = this.calcLeft(element.elementId, element.width, element.placement);
        this.applyClassPlacement(popove, element.placement);
        return element;
    }

    private applyClassOnElementActive(first: boolean) {
        this.render.addClass(this.actualElement.elementId, 'step-active');

        if (!first) {
            this.render.removeClass(this.prevElement.elementId, 'step-active');
        }
    }

    private calcTop(id: HTMLElement, heightPopover: number, placement: string): number {
        heightPopover = this.calcSizePopover(heightPopover, Dimension.HEIGHT);
        const dimensionsActualElement = id.getBoundingClientRect();
        const commonY = Math.round(dimensionsActualElement.bottom - dimensionsActualElement.height / 2
            - heightPopover / 2 + window.scrollY);
        const bottom = Math.round(dimensionsActualElement.bottom + window.scrollY);
        const top = Math.round(dimensionsActualElement.top - heightPopover + window.scrollY);

        switch (placement) {
            case Place.BOTTOM:
                return bottom;
            case Place.TOP:
                return top;
            case Place.LEFT:
            case Place.RIGHT:
                return commonY;
        }
    }

    private calcLeft(id: HTMLElement, widthPopover: number, placement: string): number {
        widthPopover = this.calcSizePopover(widthPopover, Dimension.WIDTH);
        const dimensionsActualElement = id.getBoundingClientRect();
        const commonX = Math.round((dimensionsActualElement.right - dimensionsActualElement.width / 2 - widthPopover / 2) + window.scrollX);
        const left = Math.round(dimensionsActualElement.left - widthPopover + window.scrollX);
        const right = Math.round(dimensionsActualElement.left + dimensionsActualElement.width + window.scrollX);

        switch (placement) {
            case Place.BOTTOM:
            case Place.TOP:
                return commonX;
            case Place.LEFT:
                return left;
            case Place.RIGHT:
                return right;
        }
    }

    private calcSizePopover(size: number, dimension: Dimension): number {
        const min = this.verifySizeMin(size, dimension);
        const max = this.verifySizeMax(size, dimension);
        if (size < min) return min;
        else if (size > max) return max;
        else return size;

    }

    private verifySizeMin(size: number, dimension: Dimension): number {
        switch (dimension) {
            case Dimension.HEIGHT:
                return 120;
            case Dimension.WIDTH:
                return 150;
        }
    }

    private verifySizeMax(size: number, dimension: Dimension): number {
        switch (dimension) {
            case Dimension.HEIGHT:
                return 200;
            case Dimension.WIDTH:
                return 390;
        }
    }

    private applyClassPlacement(el: any, place: string) {
        this.render.removeClass(el, 'bottom');
        this.render.removeClass(el, 'left');
        this.render.removeClass(el, 'top');
        this.render.removeClass(el, 'right');
        this.render.addClass(el, place.toLowerCase());
    }

    // export function offset(el) {
    //     const elBCR = el.getBoundingClientRect();
    //     return {
    //         width: Math.round(typeof elBCR.width === 'number' ? elBCR.width : elem.offsetWidth),
    //         height: Math.round(typeof elBCR.height === 'number' ? elBCR.height : elem.offsetHeight),
    //         top: Math.round(elBCR.top + (window.pageYOffset || document.documentElement.scrollTop)),
    //         left: Math.round(elBCR.left + (window.pageXOffset || document.documentElement.scrollLeft)),
    //         viewportWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    //         viewportHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    //     };
    // }
}
