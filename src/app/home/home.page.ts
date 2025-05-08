import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { FormsService } from '../services/forms.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonGrid, // Importación de IonGrid
    IonRow,  // Importación de IonRow
    IonCol,  // Importación de IonCol
    FormsModule,
  ],
})
export class HomePage {
  form = {
    nombre: '',
    edad: 0,
    genero: '',
    correo: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    pais: '',
    ocupacion: '',
    fechaNacimiento: '',
    createdAt: 0,
  };

  constructor(
    private formsService: FormsService,
    private alertController: AlertController
  ) {}

  onSubmit() {
    this.formsService
      .saveFormData(this.form)
      .then(() => {
        console.log('Formulario guardado:', this.form);
      })
      .catch((error) => {
        console.error('Error al guardar el formulario:', error);
      });
  }

  async abrirSelectorGenero() {
    const topAlert = await this.alertController.getTop();
    if (topAlert) return;

    const alert = await this.alertController.create({
      header: 'Selecciona tu género',
      mode: 'ios',
      cssClass: 'custom-alert',
      backdropDismiss: true,
      inputs: [
        {
          name: 'genero',
          type: 'radio',
          label: 'Masculino',
          value: 'masculino',
          checked: this.form.genero === 'masculino',
        },
        {
          name: 'genero',
          type: 'radio',
          label: 'Femenino',
          value: 'femenino',
          checked: this.form.genero === 'femenino',
        },
        {
          name: 'genero',
          type: 'radio',
          label: 'Otro',
          value: 'otro',
          checked: this.form.genero === 'otro',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: (data: string) => {
            this.form.genero = data;
          },
        },
      ],
    });

    await alert.present();
  }
}
