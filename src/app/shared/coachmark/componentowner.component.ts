import { CoachMarkModel, Element, Place } from './model/coachmark.model';
import {
    Component,
    Renderer2, ElementRef,
    Input, OnInit, NgZone, AfterViewChecked, ViewChild, OnChanges
} from '@angular/core';

@Component({
    selector: 'app-coachmark-component',
    templateUrl: './componentowner.component.html',
    styleUrls: ['./componentowner.component.css']

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
        this.applyStyleOnElementActive('first');
    }

    prev() {
        this.prevElement = this.getElement(this.position);
        this.position += -1;
        this.actualElement = this.getElement(this.position);
        this.applyStyleOnElementActive();
    }

    next() {
        this.prevElement = this.getElement(this.position);
        this.position += 1;
        this.actualElement = this.getElement(this.position);
        this.applyStyleOnElementActive();
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

    private applyStyleOnElementActive(el?: any) {
        this.render.setStyle(this.actualElement.elementId, 'z-index', '1101');
        this.render.setStyle(this.actualElement.elementId, 'position', 'relative');

        if (el != 'first') {
            this.render.removeStyle(this.prevElement.elementId, 'z-index');
            this.render.removeStyle(this.prevElement.elementId, 'position');
        }
    }

    private calcTop(id: HTMLElement, height: number, placement: string): number {
        if (height < 150) {
            height = 150;
        }
        const commonY = Math.round(id.getBoundingClientRect().bottom - id.getBoundingClientRect().height / 2 - height / 2 + window.scrollY);
        switch (placement) {
            case Place.BOTTOM:
                return Math.round(id.getBoundingClientRect().bottom + window.scrollY);
            case Place.TOP:
                return Math.round(id.getBoundingClientRect().top - height + window.scrollY);
            case Place.LEFT:
            case Place.RIGHT:
                return commonY;
        }
    }

    private calcLeft(id: HTMLElement, width: number, placement: string): number {
        if (width < 200) {
            width = 200;
        }
        switch (placement) {
            case Place.BOTTOM:
            case Place.TOP:
                return Math.round((id.getBoundingClientRect().right - id.getBoundingClientRect().width / 2
                    - width / 2) + window.scrollX);
            case Place.LEFT:
                return Math.round(id.getBoundingClientRect().left - width);
            case Place.RIGHT:
                return Math.round(id.getBoundingClientRect().left
                    + id.getBoundingClientRect().width);
        }
    }

    getHeights(): string {
        return (this.actualElement.height + window.scrollY) + 'px';
    }

    private applyClassPlacement(el: any, place: string) {
        this.render.removeClass(el, 'bottom');
        this.render.removeClass(el, 'left');
        this.render.removeClass(el, 'top');
        this.render.removeClass(el, 'right');
        this.render.addClass(el, place.toLowerCase());
    }

    getTopBackgroundStepActive(): string {
        return Math.round(this.actualElement.elementId.getBoundingClientRect().top + window.scrollY) + 'px';
    }

    getLeftBackgroundStepActive(): string {
        return Math.round(this.actualElement.elementId.getBoundingClientRect().left + window.scrollX) + 'px';
    }

    getWidthBackgroundStepActive(): string {
        return Math.round(this.actualElement.elementId.getBoundingClientRect().width) + 'px';
    }

    getHeight(): string {
        return this.actualElement.height + 'px';
    }

    getTop(): string {
        return this.actualElement.top + 'px';
    }

    getLeft(): string {
        return this.actualElement.left + 'px';
    }

    getWidth(): string {
        return this.actualElement.width + 'px';
    }

    getHeightBackgroundStepActive(): string {
        return Math.round(this.actualElement.elementId.getBoundingClientRect().height) + 'px';
    }

    showNext(): boolean {
        if (this.elements.length > 0 && this.position < this.elements.length - 1) {
            return true;
        }
    }

    finalizar() {
        console.log('finalizar');
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

    // export function addClass(el, className) {
    //     const classes = className.split(' ');
    //     classes.filter(className => className.length).forEach(className => {
    //         if (el.classList) {
    //             el.classList.add(className);
    //         } else {     
    //             if (el.className.toString() === '[object SVGAnimatedString]') {
    //                 el.className.baseVal += (el.className.baseVal.length ? ' ' : '') + className;
    //             } else {
    //                 el.className += (el.className.length ? ' ' : '') + className;
    //             }
    //         }
    //     });
    // }

    // export function removeClass(el, className) {
    //     const classes = className.split(' ');
    //     classes.filter(className => className.length).forEach(className => {
    //         if (el.classList) {
    //             el.classList.remove(className);
    //         } else {
    //             if (el.className.toString() === '[object SVGAnimatedString]'){
    //                 el.className.baseVal = el.className.baseVal.toString().replace(new RegExp('(^|\s)' + className.split(' ').join('|') + '(\s|$)', 'gi'), ' ');
    //             } else {
    //                 el.className = el.className.toString().replace(new RegExp('(^|\s)' + className.split(' ').join('|') + '(\s|$)', 'gi'), ' ');
    //             }         
    //         }
    //     });
    // }
}
