import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {map, Observable, of, switchMap, take} from 'rxjs';
import {AngularFireAuth} from "@angular/fire/compat/auth";


export interface HistoryRecord {
  inverter_1: Inverter;
  inverter_2: Inverter;
}

interface History {
  [key: string]: HistoryRecord;
}

export interface Inverter {
  acOutputActivePower: number;
  batteryCapacity: number;
  pvInputPower: number;
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
  pvInputPower: 0,
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
            map(records => {
              if (records.length > 0) {
                const inverterData = records[0][inverterId];
                // Parse pvInputPower1 to integer
                inverterData.pvInputPower = parseInt(String(inverterData.pvInputPower));
                return inverterData;
              } else {
                return {...DEFAULT_INVERTER};
              }
            })
          );
        } else {
          return of({...DEFAULT_INVERTER});
        }
      })
    );
  }


  getHistoricData(startDate: number): Observable<HistoryRecord[]> {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap(user => {
        if (user) {
          return this.db.list<HistoryRecord>(`${user.uid}`, ref =>
            ref.orderByKey().startAt(String(startDate))
          ).valueChanges().pipe(
            map((recordsArray: HistoryRecord[]) => {
              return recordsArray.map(record => {
                return {
                  inverter_1: this.parseInverterData(record['inverter_1']),
                  inverter_2: this.parseInverterData(record['inverter_2'])
                };
              });
            })
          );
        } else {
          return of([]);
        }
      })
    );
  }


  private parseInverterData(data: any): Inverter {
    // Realizar el parsing necesario de los datos aquí, por ejemplo:
    if (!data) {
      console.error('parseInverterData fue llamado con data undefined o null');
      return DEFAULT_INVERTER; // O maneja este caso según sea necesario
    }
    return {
      acOutputActivePower: parseInt(data.acOutputActivePower ?? '0'),
      batteryCapacity: parseInt(data.batteryCapacity ?? '0'),
      pvInputPower: parseInt(data.pvInputPower ?? '0'),
      batteryVoltage: parseFloat(data.batteryVoltage ?? '0'),
      totalOutActivePower: parseInt(data.totalOutActivePower ?? '0'),
      batteryDischgCurrent: parseInt(data.batteryDischgCurrent ?? '0'),
      totalChargingCurrent: parseInt(data.totalChargingCurrent ?? '0'),
      totalAcOutputActivePower: parseInt(data.totalAcOutputActivePower ?? '0'),
      timestr: data.timestr ?? ''
    };
  }

}
