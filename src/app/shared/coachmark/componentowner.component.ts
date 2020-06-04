import { CoachMarkModel, Element, Position } from './model/coachmark.model';
import {
    Component,
    Renderer2, ElementRef,
    Input, OnInit, NgZone, AfterViewChecked, ViewChild
} from '@angular/core';

@Component({
    selector: 'app-coachmark-component',
    templateUrl: './componentowner.component.html',
    styleUrls: ['./componentowner.component.css']

})
export class CoachMarkComponent implements OnInit, AfterViewChecked {

    @Input() elements: Element[];

    position = 0;
    prevElement: CoachMarkModel = new CoachMarkModel();
    actualElement: CoachMarkModel = new CoachMarkModel();

    constructor(private render: Renderer2, private ngZone: NgZone) { }

    ngOnInit() {
        this.first();
    }

    ngAfterViewChecked() {
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
        const element: CoachMarkModel = new CoachMarkModel();
        element.elementId = document.getElementById(this.elements[index].id);
        element.content = this.elements[index].content;
        element.placement = this.elements[index].placement;
        element.positionPopover = new Position(this.calcTop(element.elementId), this.calcLeft(element.elementId));
        element.positionArrow = new Position('-11px', '15px');
        element.title = this.elements[index].title;
        element.zIndex = '1101';
        element.display = 'block';
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

    private calcTop(el: HTMLElement) {
        return Math.round(el.getBoundingClientRect().bottom + window.scrollY) + 'px';
    }

    private calcLeft(el: HTMLElement) {
        return Math.round((el.getBoundingClientRect().right + window.scrollX) - (el.getBoundingClientRect().width / 2)) + 'px';
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
