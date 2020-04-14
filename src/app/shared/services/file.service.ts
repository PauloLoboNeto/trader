import { Observable, Subscriber, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FileService {
    PATH_STATIC = 'assets/static/';

    constructor(private http: HttpClient) { }

    getUrl(): Observable<any> {
        return this.http.get(`${this.PATH_STATIC}url.json`);
    }

    getResults(): Observable<any> {
        return this.http.get(`${this.PATH_STATIC}results.json`);
    }

    getCards(): Observable<any> {
        return this.http.get(`${this.PATH_STATIC}cards.json`);
    }
}

