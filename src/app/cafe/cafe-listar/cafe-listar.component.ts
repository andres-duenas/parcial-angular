import { Component, OnInit, inject, signal } from '@angular/core';
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

  ngOnInit(): void {
    this.getCafes();
  }

  getCafes(): void {
    this.cafeService.getCafes().subscribe((cafes) => this.cafes.set(cafes));
  }
}
