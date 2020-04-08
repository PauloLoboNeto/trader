import { AlphaService } from './../../shared/services/alpha.service';
import { FileService } from '../../shared/services/file.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-graphic-component',
    templateUrl: './graphic.component.html',
    styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {
    myType = 'LineChart';
    myData = [
        ['London', 8136000],
        ['New York', 8538000],
        ['Paris', 2244000],
        ['Berlin', 3470000],
        ['Kairo', 19500000]
    ];

    constructor(private alpha: AlphaService) { }
    ngOnInit() {
    //    this.alpha.getSearch().subscribe(res => console.log(res));
    }
}
