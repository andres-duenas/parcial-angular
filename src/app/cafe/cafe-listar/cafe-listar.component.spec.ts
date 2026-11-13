import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CafeListarComponent } from './cafe-listar.component';
import { CafeService } from '../cafe.service';
import { Cafe } from '../cafe';

describe('CafeListarComponent', () => {
  let component: CafeListarComponent;
  let fixture: ComponentFixture<CafeListarComponent>;
  let tabla: HTMLTableElement;

  const cafes: Cafe[] = [
    new Cafe(1, 'Café Especial para tí', 'Blend', 'Angelópolis, Antioquia', 'Panela, Durazno, Caramelo', 1920, 'imagen1.jpg'),
    new Cafe(2, 'Café Especial Navegante', 'Café de Origen', 'Guatapé, Antioquia', 'Cítrico, Naranja, Cacao', 1800, 'imagen2.png'),
    new Cafe(3, 'Café Especial El Prístino', 'Blend', 'Chinchiná, Caldas', 'Chocolate negro, Caramelo', 1700, 'imagen3.png'),
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CafeListarComponent],
      providers: [{ provide: CafeService, useValue: { getCafes: () => of(cafes) } }],
    }).compileComponents();

    fixture = TestBed.createComponent(CafeListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();

    tabla = (fixture.nativeElement as HTMLElement).querySelector('table')!;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the table with a header and three rows', () => {
    expect(tabla).toBeTruthy();
    expect(tabla.querySelectorAll('thead tr').length).toBe(1);
    expect(tabla.querySelectorAll('tbody tr').length).toBe(3);
    expect(tabla.querySelectorAll('tr').length).toBe(4);
  });

  it('should render the header columns', () => {
    const encabezados = Array.from(tabla.querySelectorAll('thead th')).map((th) => th.textContent?.trim());
    expect(encabezados).toEqual(['#', 'Nombre', 'Tipo', 'Región']);
  });

  it('should render id, nombre, tipo and region of each cafe', () => {
    const filas = tabla.querySelectorAll('tbody tr');
    cafes.forEach((cafe, i) => {
      const celdas = Array.from(filas[i].querySelectorAll('th, td')).map((c) => c.textContent?.trim());
      expect(celdas).toEqual([String(cafe.id), cafe.nombre, cafe.tipo, cafe.region]);
    });
  });
});
