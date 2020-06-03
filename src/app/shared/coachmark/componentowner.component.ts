import { CoachMarkModel, Elements, Position } from './model/coachmark.model';
import {
    Component,
    Renderer2, ElementRef,
    ChangeDetectorRef, Injector, Input, OnInit
} from '@angular/core';

@Component({
    selector: 'app-coachmark-component',
    templateUrl: './componentowner.component.html',
    styleUrls: ['./componentowner.component.css']

})
export class CoachMarkComponent implements OnInit {
    position = 0;
    @Input() elements: Elements[];
    cms = new Array<CoachMarkModel>();
    actualElement: CoachMarkModel = new CoachMarkModel();
    prevElement: CoachMarkModel = new CoachMarkModel();

    constructor(private render: Renderer2) { }

    ngOnInit() {
        this.cms = this.convertToCoachMarkModel(this.elements);
        this.focusOnCoachMarkElement(this.getNextPrevElement(this.position));
    }

    getNextPrevElement(value: number) {
        this.prevElement = this.cms[this.position];
        this.position += value;
        return this.cms[this.position];
    }

    focusOnCoachMarkElement(el: CoachMarkModel, prevNext?: number) {
        this.aplicarEstilos(el, prevNext);
        window.parent.scroll(0, el.elementId.getBoundingClientRect().top);
    }

    aplicarEstilos(el: CoachMarkModel, prevNext?: number) {
        this.actualElement = el;
        this.render.setStyle(this.actualElement.elementId, 'z-index', '1');
        this.render.setStyle(this.actualElement.elementId, 'position', 'relative');
        // console.log(this.prevElement.elementId.style.content);
        if (prevNext != undefined) {
            this.render.removeStyle(this.prevElement.elementId, 'z-index');
            this.render.setStyle(this.prevElement.elementId, 'position', this.prevElement.elementId.getAttribute('position'));
        }
    }

    getTopPopover() {
        return this.actualElement.positionPopover.top;
    }

    getLeftPopover() {
        return this.actualElement.positionPopover.left;
    }

    getTopArrow() {
        return this.actualElement.positionArrow.top;
    }

    getLeftArrow() {
        return this.actualElement.positionArrow.left;
    }

    getTitle() {
        return this.actualElement.title;
    }

    getContent() {
        return this.actualElement.content;
    }


    private convertToCoachMarkModel(elements: Elements[]): CoachMarkModel[] {
        const coachs = new Array<CoachMarkModel>();
        elements.map((val: Elements) => {
            const cm = new CoachMarkModel();
            cm.elementId = document.getElementById(val.id);
            cm.content = val.content;
            cm.placement = val.placement;
            cm.positionPopover = new Position(this.calcTop(cm.elementId), this.calcLeft(cm.elementId));
            cm.positionArrow = new Position('-11px', '15px');
            cm.title = val.title;
            coachs.push(cm);
        });
        return coachs;
    }

    private calcTop(el: any) {
        return Math.round(el.getBoundingClientRect().bottom) + 'px';
    }

    private calcLeft(el: any) {
        return Math.round(el.getBoundingClientRect().right - (el.getBoundingClientRect().width / 2)) + 'px';
    }
}
