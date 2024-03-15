import { TestBed } from '@angular/core/testing';

import { LocalNotificationService } from './notificacion.service';// Import the correct module

describe('InventarioService', () => {
  let service: LocalNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
