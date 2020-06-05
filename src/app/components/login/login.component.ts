import { CoachMarkModel, Element, Place } from './../../shared/coachmark/model/coachmark.model';
import { CoachMarkComponent } from './../../shared/coachmark/componentowner.component';
import { FormularioLoginModel } from '../../models/login/formularioLogin.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChildren, AfterViewChecked, QueryList, ViewChild, ChangeDetectorRef, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { CMDirective } from 'src/app/shared/coachmark/directive/cmDirective.directive';

@Component({
    selector: 'app-login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    mensagem: string;
    groupLogin: FormGroup;
    user = 'admin';
    password = 'admin';
    ids: Element[] = new Array<Element>();

    constructor(private formBuilder: FormBuilder,
                private readonly router: Router
    ) { }

    ngOnInit() {
        const formularioLoginModel = new FormularioLoginModel(this.formBuilder);
        this.groupLogin = formularioLoginModel.inicializarFormulario();
        this.mensagem = 'Trader Angular';

        // const el1 = new Element();
        // el1.id = 'input-1';
        // el1.content = 'Input 1';
        // el1.placement = Place.BOTTOM;
        // el1.title = 'titulo input-1';

        // const el2 = new Element();
        // el2.id = 'input-2';
        // el2.content = 'Input 2';
        // el2.placement = Place.BOTTOM;
        // el2.title = 'titulo input-2';

        // const el3 = new Element();
        // el3.id = 'input-3';
        // el3.content = 'Input 3';
        // el3.placement = Place.BOTTOM;
        // el3.title = 'titulo input-3';

        // this.ids.push(el1, el2, el3);
    }

    public logar(user: string, password: string) {
        if (user == this.user && password == this.password) {
            this.router.navigate(['/home-component']);
        }
    }
}
