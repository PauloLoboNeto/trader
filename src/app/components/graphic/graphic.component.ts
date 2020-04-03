import { Component } from '@angular/core';

@Component({
    selector: 'app-graphic-component',
    templateUrl: './graphic.component.html',
    styleUrls: ['./graphic.component.css']
})
export class GraphicComponent {
    myType = 'LineChart';
    myData = [
        ['London', 8136000],
        ['New York', 8538000],
        ['Paris', 2244000],
        ['Berlin', 3470000],
        ['Kairo', 19500000]
    ];
}
