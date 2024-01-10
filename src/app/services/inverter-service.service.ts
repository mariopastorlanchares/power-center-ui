import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {map, Observable, of, switchMap, take} from 'rxjs';
import {AngularFireAuth} from "@angular/fire/compat/auth";


export interface Inverter {
  acOutputActivePower: number;
  batteryCapacity: number;
  pvInputPower1: number;
  batteryVoltage: number;
  totalOutActivePower: number;
  batteryDischgCurrent: number;
  totalChargingCurrent: number;
  totalAcOutputActivePower: number;
  timestr: string;
}

export const DEFAULT_INVERTER: Inverter = {
  acOutputActivePower: 0,
  batteryCapacity: 0,
  pvInputPower1: 0,
  batteryVoltage: 0,
  totalOutActivePower: 0,
  batteryDischgCurrent: 0,
  totalChargingCurrent: 0,
  totalAcOutputActivePower: 0,
  timestr: ''
};

@Injectable({
  providedIn: 'root'
})
export class InverterService {
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) {
  }

  getLatestInverterData(inverterId: string): Observable<Inverter> {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap(user => {
        if (user) {
          return this.db.list<{ [key: string]: Inverter }>(`${user.uid}`, ref =>
            ref.orderByKey().limitToLast(1)
          ).valueChanges().pipe(
            map(records => records.length > 0 ? records[0][inverterId] : {...DEFAULT_INVERTER})
          );
        } else {
          return of({...DEFAULT_INVERTER});
        }
      })
    );
  }

}
