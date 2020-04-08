import { Observable, Subscriber, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FileService {

    constructor(private http: HttpClient) { }

    // async getUrl(url: string) {
    //     let urlObtida: string;
    //     const response = await this.http.get<any>('assets/static/url.json');
    //     const contents = await response.forEach(res => urlObtida = res);
    //     return await urlObtida[url];
    // }

    getUrl(): Observable<any> {
        return this.http.get('assets/static/url.json');
    }
}

