import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-modal-component',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent {

    @ViewChild('modal') modal: ElementRef;

    openModal() {
        this.modal.nativeElement.style.display = 'block';
    }

    // // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    //   if (event.target == modal) {
    //     modal.style.display = "none";
    //   }
    // }
}
