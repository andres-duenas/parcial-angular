import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CafeListarComponent } from './cafe-listar/cafe-listar.component';

@NgModule({
  declarations: [CafeListarComponent],
  imports: [CommonModule],
  exports: [CafeListarComponent],
})
export class CafeModule {}
