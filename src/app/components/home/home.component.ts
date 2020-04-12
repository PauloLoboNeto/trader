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
import { debounceTime, distinctUntilChanged, switchMap, catchError, map } from 'rxjs/operators';
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
        ]),
        trigger('openCloseTrigger', [
            state('open', style({
                paddingTop: '8px',
                paddingBottom: '10px',
                paddingLeft: '0px',
                paddingRight: '0px',
                display: '',
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: '0px 0px 10px 10px',
                background: 'white',
                borderBottom: '0.021em solid',
                borderLeft: '0.021em solid',
                borderRight: '0.021em solid'
            })),
            state('closed', style({
                display: 'none'
            }))
        ])
    ]
})
export class HomeComponent implements OnInit {

    cards: CardModel[] = new Array<CardModel>();
    cardPesquisa = new Array<CardModel>();

    @ViewChild('inputSearch') inputSearch: ElementRef;
    @ViewChild('card') card: ElementRef;
    @ViewChild(ModalComponent) modal: ModalComponent;

    resultsSearch = [];
    currentIconInput: string;
    exibirIconCheck = false;
    currentIconCard: string;
    searchForm: FormGroup;
    searchControl: FormControl;
    openCloseTrigger = false;

    constructor(
        private alertService: AlertService,
        private renderer: Renderer2,
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
        // this.resultsSearch.push('1', '2', '3');
        this.currentIconInput = 'fa fa-times-circle-o';
        this.currentIconCard = 'fa fa-times';

        this.searchControl = this.fb.control('');

        this.searchForm = this.fb.group({
            searchControl: this.searchControl
        });

        this.searchControl.valueChanges
            .pipe(
                debounceTime(80),
                distinctUntilChanged(),
                switchMap((searchTerm: any) => this.alphaService.getSearch(searchTerm)))
            .subscribe((res: any) => {
                if (res['bestMatches']) {
                    this.exibirIconCheck = this.showIconCheck();
                    if (res['bestMatches'].length == 0 || this.inputSearch.nativeElement.value.length == 0) {
                        this.inputSearch.nativeElement.style['border-radius'] = '50px';
                        this.inputSearch.nativeElement.style['border-bottom'] = '';
                        this.openCloseTrigger = false;
                    } else {
                        this.resultsSearch = res['bestMatches'].filter(value => {
                            if (value['2. name']
                                .toLowerCase()
                                .replace(/ /g, '')
                                .includes(this.inputSearch.nativeElement.value.toLowerCase().replace(/ /g, ''))
                                || value['1. symbol']
                                    .toLowerCase()
                                    .replace(/ /g, '')
                                    .includes(this.inputSearch.nativeElement.value.toLowerCase().replace(/ /g, ''))) return value;
                        });
                        if (this.resultsSearch.length > 0) {
                            this.inputSearch.nativeElement.style['border-radius'] = '20px 20px 0px 0px';
                            this.inputSearch.nativeElement.style['border-bottom'] = '1px solid darkgrey';
                            this.openCloseTrigger = true;
                        } else {
                            this.inputSearch.nativeElement.style['border-radius'] = '50px';
                            this.inputSearch.nativeElement.style['border-bottom'] = '';
                            this.openCloseTrigger = false;
                        }
                    }
                } else {
                    this.resultsSearch = [];
                }
            });
    }

    showIconCheck() {
        if (this.inputSearch.nativeElement.value.length > 0) return true;
        else return false;
    }

    apagarPesquisa() {
        this.inputSearch.nativeElement.value = '';
        this.exibirIconCheck = false;
        this.inputSearch.nativeElement.style['border-radius'] = '50px';
        this.inputSearch.nativeElement.style['border-bottom'] = '';
        this.openCloseTrigger = false;
        this.searchForm.get('searchControl').updateValueAndValidity();
    }

    adicionarCard() {
        const retornoPesquisa = this.cardPesquisa.filter((card: CardModel) => {
            if (card.getAbreviationName().toUpperCase() === this.inputSearch.nativeElement.value.toUpperCase()
                || card.getName().toUpperCase() === this.inputSearch.nativeElement.value.toUpperCase()) {
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
        this.inputSearch.nativeElement.style['box-shadow'] = valor;
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
    }
}
