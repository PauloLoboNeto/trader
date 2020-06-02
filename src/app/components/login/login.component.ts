import { CoachMarkComponent } from './../../shared/coachmark/componentowner.component';
import { FormularioLoginModel } from '../../models/login/formularioLogin.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChildren, AfterViewChecked, QueryList, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CMDirective } from 'src/app/shared/coachmark/directive/cmDirective.directive';

@Component({
    selector: 'app-login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewChecked {
    mensagem: string;
    groupLogin: FormGroup;
    user = 'admin';
    password = 'admin';
    @ViewChild('coach') coach: CoachMarkComponent;
    @ViewChildren(CMDirective) fields: QueryList<CMDirective>;

    constructor(private formBuilder: FormBuilder, private readonly router: Router, private cd: ChangeDetectorRef) { }

    ngAfterViewChecked(): void {
        this.coach.addElements(this.fields);
        this.coach.init();
        this.cd.detectChanges();
    }

    ngOnInit() {
        const formularioLoginModel = new FormularioLoginModel(this.formBuilder);
        this.groupLogin = formularioLoginModel.inicializarFormulario();
        this.mensagem = 'Trader Angular';
    }

    public logar(user: string, password: string) {
        if (user == this.user && password == this.password) {
            this.router.navigate(['/home-component']);
        }
    }
}
