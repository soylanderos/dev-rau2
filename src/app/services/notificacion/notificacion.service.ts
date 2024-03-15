import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {

  constructor() { }

  async notificar(mensaje: string) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Notificación de stock bajo',
          body: mensaje,
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 5) } // Enviar la notificación en 5 segundos
        }
      ]
    });
  }
}
