import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home-component',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
    loop = ['1', '2', '3', '4'];
    myType = 'LineChart';
    myData = [
        ['London', 8136000],
        ['New York', 8538000],
        ['Paris', 2244000],
        ['Berlin', 3470000],
        ['Kairo', 19500000]
      ];

    constructor() { }

    ngOnInit() {
     
    }
}
