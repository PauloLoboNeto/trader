import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ModalException } from 'src/app/shared/errors/ModalException';

@Component({
    selector: 'app-modal-body-component',
    templateUrl: './modal-body.component.html',
    styleUrls: ['./modal-body.component.css']
})
export class ModalBodyComponent {
    @ViewChild('modal') modal: ElementRef;

    closeModal() {
        let elementRef = this.modal.nativeElement;
        try {
            while (elementRef.className != 'modal-component') {
                if (elementRef.parentNode.className == 'modal-component') {
                    elementRef.parentNode.style.display = 'none';
                    elementRef = elementRef.parentNode;
                } else {
                    elementRef = elementRef.parentNode;
                }
            }
        } catch (error) {
            const err: TypeError = error;
            if (err.message == 'Cannot read property \'className\' of null') {
                throw ModalException.prototype.classNameNotFound();
            }
        }
    }
}
