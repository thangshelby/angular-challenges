import { inject, Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { map, mergeMap, Observable, of } from 'rxjs';
import { Role } from './user.model';
import { UserStore } from './user.store';

@Injectable({
  providedIn: 'root',
})
export class HasPermissionGuard implements CanMatch {
  private userStore = inject(UserStore);
  private router = inject(Router);

  canMatch(
    route: Route,
    segments: UrlSegment[],
  ): Observable<boolean | UrlTree> {
    const accessRolesList: Role[] = route.data?.['roles'] ?? [];

    const isAdmin: boolean = route.data?.['isAdmin'] ?? false;
    return this.hasPermissionGuard$(isAdmin, accessRolesList);
  }

  private hasPermissionGuard$(isAdmin: boolean, accessRolesList: Role[]) {
    return this.userStore.isUserLogin$.pipe(
      mergeMap((hasUser) => {
        if (hasUser) {
          if (isAdmin) {
            return this.userStore.isAdmin$.pipe(map(Boolean));
          } else if (accessRolesList.length > 0) {
            return this.userStore
              .hasAnyRole(accessRolesList)
              .pipe(map(Boolean));
          }
          return of(false);
        } else {
          return of(this.router.parseUrl('no-user'));
        }
      }),
    );
  }
}
