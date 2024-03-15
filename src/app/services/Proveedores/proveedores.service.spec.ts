import { TestBed } from '@angular/core/testing';

import { ProveedorService } from './proveedores.service'; // Import the correct module

describe('InventarioService', () => {
  let service: ProveedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProveedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
