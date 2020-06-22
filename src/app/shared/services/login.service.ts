import { Observable } from 'rxjs';
import { Login } from './../../models/login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

    private urlLogin = 'http://localhost:8082/api/v1/auth/signin';

    constructor(private http: HttpClient) { }

    public login(request: Login): any {
        // let header = new HttpHeaders();
        // header.set("Content-Type", "application/json");
        return this.http.post(this.urlLogin, request);
    }
}