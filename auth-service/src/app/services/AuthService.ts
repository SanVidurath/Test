import { Injectable } from '@angular/core';
import { env } from '../env/env.test';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${env.baseUrl}/api/auth`;
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/signin`, {
      username,
      password,
    });
  }

  register(username:string, password:string){
    return this.http.post(`${this.apiUrl}/signup`,{
        username,
        password
    })
  }

  setToken(token:string){
    localStorage.setItem('token', token);
  }

  getToken():string|null{
    return localStorage.getItem('token')
  }

  isLoggedIn():boolean{
    return !!this.getToken();
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['login']);
  }
  
}
