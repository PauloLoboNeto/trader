import { Component } from '@angular/core';
import { Element, Place } from './../shared/coachmark/model/coachmark.model';

@Component({
  selector: 'a-root',
  templateUrl: './a.component.html'
})
export class A {
  title = 'trader-angular';

  ids: Element[] = new Array<Element>();

  ngOnInit(){
    const el1 = new Element();
    el1.id = 'input-1';
    el1.content = 'Input 1';
    el1.placement = Place.BOTTOM;
    el1.title = 'titulo input-1';

    const el2 = new Element();
    el2.id = 'input-2';
    el2.content = 'Input 2';
    el2.placement = Place.BOTTOM;
    el2.title = 'titulo input-2';

    const el3 = new Element();
    el3.id = 'input-3';
    el3.content = 'Input 3';
    el3.placement = Place.BOTTOM;
    el3.title = 'titulo input-3';

    this.ids.push(el1, el2, el3);
  }
}