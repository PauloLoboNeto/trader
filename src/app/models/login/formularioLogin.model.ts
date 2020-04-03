import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class FormularioLoginModel {

    constructor(private formBuilder: FormBuilder) { }

    inicializarFormulario(): FormGroup {
        return this.formBuilder.group({
            usuario: this.formBuilder.control('', Validators.required),
            senha: this.formBuilder.control('', Validators.required)
        });
    }
}
