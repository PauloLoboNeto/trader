import { AlertType } from './alert.enum';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {
    alertSuccess(tipo: AlertType, titulo: string = '', texto: string = '', rodapé: string = '') {
        Swal.fire({
            icon: tipo,
            title: titulo,
            text: texto,
            footer: rodapé
        });
    }
}
