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

        const el1 = new Element();
        el1.id = 'input-1';
        el1.content = 'asdadads kh asdadads kh khdskh sdkahsd kjh flksdajfsldkafjsalkfdjaslkdfjasdadads kh khdskh sdkahsd kjh flksdajfsldkafjsalkfdjaslkdfjasdadads kh khdskh sdkahsd kjh flksdajfsldkafjsalkfdjaslkdfjasdadads kh khdskh sdkahsd kjh flksdajfsldkafjsalkfdjaslkdfjasdadads kh khdskh sdkahsd kjh flksdajfsldkafjsalkfdjaslkdfjkhdskh sdkahsd kjh flksdajfsldkafjsalkfdjaslkdfjsafasfjsaklrklwerjqklwrjlkqwerjlwkqerjqwklrjqkwlerjklwqejrlkwfsldkfhlksahfInputlksdInput 1';
        el1.placement = Place.TOP;
        el1.title = 'Titulo input-1';
        el1.height = 200;
        el1.width = 200;

        const el2 = new Element();
        el2.id = 'input-2';
        el2.content = 'asdadads kh akljldkjfslkdjflksdfjldksjflkdsfjsdadads kh khdskh sdkahsd kjh flksdajfsldkafjsalkfdjaslkdfjasdadads kh khdskh sdkahsd kjh flksdajfsldkafjsalkfdjaslkdfjasdadads kh khdskh sdkahsd kjh flksdajfsldkafjsalkfdjaslkdfjasdadads kh khdskh sdkahsd kjh flksdajfsldkafjsalkfdjaslkdfjasdadads kh khdskh sdkahsd kjh flksdajfsldkafjsalkfdjaslkdfjkhdskh sdkahsd kjh flksdajfsldkafjsalkfdjaslkdfjsafasfjsaklrklwerjqklwrjlkqwerjlwkqerjqwklrjqkwlerjklwqejrlkwfsldkfhlksahfInputlksdInput 1';
        el2.placement = Place.BOTTOM;
        el2.title = 'Titulo input-2';
        el2.height = 200;
        el2.width = 200;

        const el3 = new Element();
        el3.id = 'input-3';
        el3.content = 'Input 3';
        el3.placement = Place.LEFT;
        el3.title = 'Titulo input-3';
        el3.height = 150;
        el3.width = 278;

        const el4 = new Element();
        el4.id = 'input-4';
        el4.content = 'asdadads ';
        el4.placement = Place.LEFT;
        el4.title = 'Titulo input-4';
        el4.height = 190;
        el4.width = 260;

        const el5 = new Element();
        el5.id = 'texto';
        el5.content = 'Inputlksdjflksdajfsldkafjsalkfdjaslkdfjsafasfjsaklrklwerjqklwrjlkqwerjlwkqerjqwklrjqkwlerjklwqejrlkwfsldkfhlksahf 4';
        el5.placement = Place.BOTTOM;
        el5.title = 'Titulo input-5';
        el5.height = 50;
        el5.width = 200;
        this.ids.push(el1, el2, el3, el4, el5);

    }

    public logar(user: string, password: string) {
        if (user == this.user && password == this.password) {
            this.router.navigate(['/home-component']);
        }
    }
}
