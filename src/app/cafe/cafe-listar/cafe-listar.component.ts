import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Cafe } from '../cafe';
import { CafeService } from '../cafe.service';

@Component({
  selector: 'app-cafe-listar',
  standalone: false,
  styleUrl: './cafe-listar.component.css',
  templateUrl: './cafe-listar.component.html',
})
export class CafeListarComponent implements OnInit {
  private readonly cafeService = inject(CafeService);

  protected readonly cafes = signal<Cafe[]>([]);

  protected readonly totalOrigen = computed(() => this.contarPorTipo('Café de Origen'));
  protected readonly totalBlend = computed(() => this.contarPorTipo('Blend'));

  ngOnInit(): void {
    this.getCafes();
  }

  getCafes(): void {
    this.cafeService.getCafes().subscribe((cafes) => this.cafes.set(cafes));
  }

  private contarPorTipo(tipo: string): number {
    return this.cafes().filter((cafe) => cafe.tipo === tipo).length;
  }
}
