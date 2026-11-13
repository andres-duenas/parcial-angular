import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cafe } from './cafe';

/** Inyectada en tiempo de compilación desde .env (ver scripts/ng-env.mjs). */
declare const NG_API_URL: string | undefined;

const API_URL_POR_DEFECTO =
  'https://gist.githubusercontent.com/josejbocanegra/e9d24db370ce95b75555f7d1f8691805/raw/8a26ac2bca4183dc88545e14c45851d698911358/202212_MISW4104_Grupo3.json';

@Injectable({
  providedIn: 'root',
})
export class CafeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl =
    typeof NG_API_URL !== 'undefined' && NG_API_URL ? NG_API_URL : API_URL_POR_DEFECTO;

  getCafes(): Observable<Cafe[]> {
    return this.http.get<Cafe[]>(this.apiUrl);
  }
}
