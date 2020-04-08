import { AlphaService } from './../../shared/services/alpha.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AlertService } from './../../shared/services/alert/alert.service';
import { CardModel } from '../../models/login/card.model';
import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { AlertType } from './../../shared/services/alert/alert.enum';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ModalComponent } from '../modal/modal.component';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-home-component',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                style({ transform: 'translateY(-20%)' }), animate(250)
            ]),
            transition('* => void', [
                animate(300, style({ transform: 'translateY(-25%)' }))
            ])
        ])
    ]
})
export class HomeComponent implements OnInit {

    cards: CardModel[] = new Array<CardModel>();
    cardPesquisa = new Array<CardModel>();

    @ViewChild('inputSearch') search: ElementRef;
    @ViewChild('card') card: ElementRef;
    @ViewChild(ModalComponent) modal: ModalComponent;

    currentIconInput: string;
    exibirIconOne = false;
    currentIconCard: string;

    searchForm: FormGroup;
    searchControl: FormControl;

    constructor(private alertService: AlertService, private renderer: Renderer2,
        private fb: FormBuilder, private alphaService: AlphaService) {
        const card1 = new CardModel();
        card1.setAbreviationName('MGLU1');
        card1.setName('MAGAZ1 LUIZA ON NM');
        card1.setValue('129,99');
        card1.setPorcentage('+1,29%');
        card1.setMin('48,80');
        card1.setMax('59,90');
        card1.setDate('27/03/2020');
        card1.setDateTime('17:31:57');

        const card2 = new CardModel();
        card2.setAbreviationName('MGLU2');
        card2.setName('MAGAZ4 LUIZA ON NM');
        card2.setValue('88.129,99');
        card2.setPorcentage('+19,29%');
        card2.setMin('48,80');
        card2.setMax('59,90');
        card2.setDate('27/03/2020');
        card2.setDateTime('17:31:57');
        const card3 = new CardModel();
        card3.setAbreviationName('MGLU3');
        card3.setName('MAGAZ4 LUIZA ON NM');
        card3.setValue('88.129,99');
        card3.setPorcentage('+19,29%');
        card3.setMin('48,80');
        card3.setMax('59,90');
        card3.setDate('27/03/2020');
        card3.setDateTime('17:31:57');

        const card4 = new CardModel();
        card4.setAbreviationName('MGLU4');
        card4.setName('MAGAZ4 LUIZA ON NM');
        card4.setValue('88.129,99');
        card4.setPorcentage('+19,29%');
        card4.setMin('48,80');
        card4.setMax('59,90');
        card4.setDate('27/03/2020');
        card4.setDateTime('17:31:57');
        this.cards.push(card1, card2, card3, card4);

        const card5 = new CardModel();
        card5.setAbreviationName('MGLU5');
        card5.setName('MAGAZ5 LUIZA ON NM');
        card5.setValue('129,99');
        card5.setPorcentage('+1,29%');
        card5.setMin('48,80');
        card5.setMax('59,90');
        card5.setDate('27/03/2020');
        card5.setDateTime('17:31:57');

        const card6 = new CardModel();
        card6.setAbreviationName('MGLU6');
        card6.setName('MAGAZ6 LUIZA ON NM');
        card6.setValue('129,99');
        card6.setPorcentage('+166,29%');
        card6.setMin('48,80');
        card6.setMax('59,90');
        card6.setDate('27/03/2020');
        card6.setDateTime('17:31:57');

        this.cardPesquisa.push(card5, card6);
    }

    ngOnInit() {
        this.currentIconInput = 'fa fa-times-circle-o';
        this.currentIconCard = 'fa fa-times';

        this.searchControl = this.fb.control('')

        this.searchForm = this.fb.group({
            searchControl: this.searchControl
        })

        this.searchControl.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(
                    (searchTerm: any) => this.alphaService.getSearch(searchTerm))
            ).subscribe(resp => console.log(resp));

        // this.restaurantsService.restaurants().subscribe(restaurants => this.restaurants = restaurants);
    }

    pesquisar() {
        if (this.search) {
            if (this.search.nativeElement.value.length > 3) {
                this.exibirIconOne = true;
            } else {
                this.exibirIconOne = false;
            }
        }
    }

    apagarPesquisa() {
        this.search.nativeElement.value = '';
        this.exibirIconOne = false;
    }

    adicionarCard() {
        const retornoPesquisa = this.cardPesquisa.filter((card: CardModel) => {
            if (card.getAbreviationName().toUpperCase() === this.search.nativeElement.value.toUpperCase()
                || card.getName().toUpperCase() === this.search.nativeElement.value.toUpperCase()) {
                return card;
            }
        });

        if (retornoPesquisa.length > 0) {
            const comparacao = this.cards.filter((card: CardModel) => {
                if (retornoPesquisa[0] == card) { return card; }
            });

            if (comparacao.length == 0) {
                this.cards.push(retornoPesquisa[0]);
            } else {
                this.alertService.alertSuccess(AlertType.INFO, '', 'Card Já Foi Adicionado');
            }
        } else {
            this.definirBoxShadow('0px 0px 10px red');
            this.alertService.alertSuccess(AlertType.ERROR, '', 'Card não encontrado');
        }
    }

    alterarIconCard(index: string, event: string) {
        if (event == 'mouseenter') {
            // this.renderer.removeClass(this.card.nativeElement.'fa fa-times');
            this.renderer.removeClass(this.card.nativeElement.children[index]
                .children[0].children[0].children[1].children[0], 'fa-times');
            this.renderer.addClass(this.card.nativeElement.children[index]
                .children[0].children[0].children[1].children[0], 'fa-times-circle');
        } else if (event == 'mouseleave') {
            this.renderer.removeClass(this.card.nativeElement.children[index]
                .children[0].children[0].children[1].children[0], 'fa-times-circle');
            this.renderer.addClass(this.card.nativeElement.children[index]
                .children[0].children[0].children[1].children[0], 'fa-times');
        }
    }

    atribuirCor() {
        this.definirBoxShadow('0px 0px 10px blue');
    }

    removerCor() {
        this.definirBoxShadow('none');
    }

    excluirCard(index: number) {
        this.cards.splice(index, 1);
    }

    openModal() {
        this.modal.openModal();
    }

    definirBoxShadow(valor: string) {
        this.search.nativeElement.style['box-shadow'] = valor;
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
    }
}
