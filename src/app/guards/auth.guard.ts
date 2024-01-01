import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {map, Observable, take, tap} from 'rxjs';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {user} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => {
          console.log(user);
          return user != null;
        }
      ),
      tap(loggedIn => {
        // Verifica si la URL actual no es '/login'
        if (!loggedIn && !this.router.url.startsWith('/login')) {
          this.router.navigate(['/login']);
        }
      })
    );
  }


}
