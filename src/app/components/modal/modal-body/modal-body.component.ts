import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';



@Component({
    selector: 'app-modal-body-component',
    templateUrl: './modal-body.component.html',
    styleUrls: ['./modal-body.component.css']
})
export class ModalBodyComponent {
    @ViewChild('modal') modal: ElementRef;

    closeModal() {
        let elementRef = this.modal.nativeElement;
        while (elementRef.className != 'modal-component') {
            if (elementRef.parentNode.className == 'modal-component') {
                elementRef.parentNode.style.display = 'none';
                elementRef = elementRef.parentNode;
            } else {
                elementRef = elementRef.parentNode;
            }
        }
    }
}
