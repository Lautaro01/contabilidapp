import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Asientos } from "./asientos";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private asientosCollecion: AngularFirestoreCollection<Asientos>;
  asientos: Observable<Asientos[]>;

  constructor(private afs: AngularFirestore) { 
    this.asientosCollecion = this.afs.collection<Asientos>('asientos', ref => ref.orderBy('date','asc'));
    this.asientos = this.asientosCollecion.snapshotChanges().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Asientos;
      const id = a.payload.doc.id;
      return { id, ...data };
    })))
  }

  setAsiento(asiento : Asientos)
  {
    asiento.id = this.afs.createId();
    this.afs.collection('asientos').doc(asiento.id).set(asiento);
  }

  deleteAsiento(id : string)
  {
    console.log(id);
    this.asientosCollecion.doc(id).delete();
  }

  updateAsiento(asiento : Asientos)
  {
    this.asientosCollecion.doc(asiento.id).update(
      asiento
    )
  }

  getAsientoUnico(id : string)
  {
    return this.asientosCollecion.doc(id).snapshotChanges();
  }


}
