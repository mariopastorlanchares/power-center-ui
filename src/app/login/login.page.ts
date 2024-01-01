import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  async login() {
    try {
      await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      // Navegar a la página principal tras el inicio de sesión exitoso
      await this.router.navigateByUrl('/tabs');
    } catch (error) {
      console.error(error);
      // Manejar errores de inicio de sesión aquí
    }
  }


}
