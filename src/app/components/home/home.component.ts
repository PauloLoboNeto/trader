import { Cards, Card } from './../../models/login/card.model';
import { AlphaService } from './../../shared/services/alpha.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AlertService } from './../../shared/services/alert/alert.service';
import { Component, OnInit, ElementRef, ViewChild, Renderer2, HostListener, ViewChildren, QueryList } from '@angular/core';
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
import { ListKeyManager } from '@angular/cdk/a11y';

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
            })),
            state('closed', style({
                display: 'none'
            }))
        ])
    ]
})
export class HomeComponent implements OnInit {



    @ViewChild('inputSearch') inputSearch: ElementRef;
    @ViewChild('card') card: ElementRef;
    @ViewChild(ModalComponent) modal: ModalComponent;
    @ViewChildren('ulSearch') ulSearch: QueryList<any>;

    resultsSearch = [];
    currentIconInput: string;
    exibirIconCheck = false;
    currentIconCard: string;
    searchForm: FormGroup;
    searchControl: FormControl;
    openCloseTrigger = false;
    keyboardEventsManager: ListKeyManager<any>;
    isActive: boolean;
    cardsAdicionado: Card[] = new Array<Card>();

    constructor(
        private alertService: AlertService,
        private renderer: Renderer2,
        private fb: FormBuilder, private alphaService: AlphaService) {
    }

    ngOnInit() {
        this.isActive = false;
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
                                .replace(/\s+/g, ' ')
                                .includes(this.inputSearch.nativeElement.value.toLowerCase().replace(/\s+/g, ' '))
                                || value['1. symbol']
                                    .toLowerCase()
                                    .replace(/\s+/g, ' ')
                                    .includes(this.inputSearch.nativeElement.value.toLowerCase().replace(/\s+/g, ' '))) return value;
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
                    this.keyboardEventsManager = new ListKeyManager<any>(this.ulSearch);
                    this.initKeyManagerHandlers();
                } else {
                    this.resultsSearch = [];
                }
            });
    }

    initKeyManagerHandlers() {
        this.keyboardEventsManager
            .change
            .subscribe((activeIndex) => {
                this.ulSearch.map((item: ElementRef, index) => {
                    if (activeIndex === index) {
                        item.nativeElement.style['background'] = 'rgb(230, 229, 229)';
                    } else if (activeIndex != index) {
                        item.nativeElement.style['background'] = '';
                    }
                    return item;
                });
            });
    }

    handleKeyUp(event: KeyboardEvent) {
        event.stopImmediatePropagation();
        if (this.keyboardEventsManager) {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                this.keyboardEventsManager.onKeydown(event);
                return false;
            } else if (event.key.toUpperCase() === 'ENTER') {
                this.searchForm.get('searchControl')
                    .patchValue(this.keyboardEventsManager.activeItem.nativeElement.textContent
                        .replace(/\s+/g, ' ').split('-')[0]);
                return false;
            }
        }
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
        let retornoPesquisa = [];

        this.alphaService.getCard().subscribe((cards: Cards) => {
            console.log(cards['companyAction']);
            retornoPesquisa = cards.companyAction.filter((res: Card) => {
                if (res.abreviationName
                        .toUpperCase().replace(/\s+/g, '') === this.inputSearch.nativeElement.value
                                                                .toUpperCase().replace(/\s+/g, '')
                    || res.name
                        .toUpperCase().replace(/\s+/g, '') === this.inputSearch.nativeElement.value
                                                                .toUpperCase().replace(/\s+/g, '')) {
                    return res;
                }
            });

            if (retornoPesquisa.length > 0) {
                const comparacao = this.cardsAdicionado.filter((card: Card) => {
                    if (retornoPesquisa[0] == card) { return card; }
                });

                if (comparacao.length == 0) {
                    this.cardsAdicionado.push(retornoPesquisa[0]);
                } else {
                    this.alertService.alert(AlertType.INFO, '', 'Card Já Foi Adicionado');
                }
            } else {
                this.definirBoxShadow('0px 0px 10px red');
                this.alertService.alert(AlertType.ERROR, '', 'Card não encontrado');
            }
        });
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
        //  this.apagarPesquisa();
    }

    excluirCard(index: number) {
        this.cardsAdicionado.splice(index, 1);
    }

    openModal() {
        this.modal.openModal();
    }

    definirBoxShadow(valor: string) {
        this.inputSearch.nativeElement.style['box-shadow'] = valor;
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.cardsAdicionado, event.previousIndex, event.currentIndex);
    }
}
