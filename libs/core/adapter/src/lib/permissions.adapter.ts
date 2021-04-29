import { map, shareReplay, startWith, switchMap } from 'rxjs/operators'
import { from, fromEvent, Observable } from 'rxjs'

export type PermissionsQueryArgs = Parameters<
  typeof Permissions.prototype.query
>[0]

export class PermissionsAdapter {
  constructor(
    private readonly permissions: Permissions,
    private permissionsSupported: boolean = true
  ) {}

  state(name: PermissionName): Observable<PermissionState>
  state(descriptor: PermissionsQueryArgs): Observable<PermissionState>
  state(
    nameOrDescriptor: PermissionName | PermissionsQueryArgs
  ): Observable<PermissionState> {
    const descriptor: PermissionDescriptor =
      typeof nameOrDescriptor === 'string'
        ? { name: nameOrDescriptor }
        : nameOrDescriptor

    return new Observable<PermissionState>((subscriber) => {
      if (!this.permissionsSupported) {
        subscriber.error('Permissions is not supported in your browser')

        return
      }

      return from(this.permissions.query(descriptor))
        .pipe(
          switchMap((status) =>
            fromEvent(status, 'change').pipe(
              startWith(''),
              map(() => status.state)
            )
          )
        )
        .subscribe(subscriber)
    }).pipe(shareReplay({ bufferSize: 1, refCount: true }))
  }
}
