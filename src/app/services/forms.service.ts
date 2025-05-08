import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface FormData {
  nombre: string;
  edad: number;
  genero: string;
  correo: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  pais: string;
  ocupacion: string;
  fechaNacimiento: string;
  createdAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private firestore: Firestore) {}

  // Obtener los datos del formulario desde Firestore
  getFormData(): Observable<FormData[]> {
    const formsRef = collection(this.firestore, 'formData');
    const q = query(formsRef, orderBy('createdAt'));
    return collectionData(q, { idField: 'id' }) as Observable<FormData[]>;
  }

  // Guardar los datos del formulario en Firestore
  saveFormData(formData: FormData) {
    const formsRef = collection(this.firestore, 'formData');
    formData.createdAt = Date.now(); // Agregar la fecha de creación
    return addDoc(formsRef, formData);
  }
}