import { Observable } from 'rxjs';
import { FileService } from './file.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, mergeMap } from 'rxjs/operators';

@Injectable()
export class AlphaService {

    constructor(private fileService: FileService, private http: HttpClient) { }

    getSearch(search: string): Observable<any> {
        return this.fileService.getUrl()
            .pipe(
                switchMap(res => {
                    return this.fileService.getResults();
                })
            );
    }
}
