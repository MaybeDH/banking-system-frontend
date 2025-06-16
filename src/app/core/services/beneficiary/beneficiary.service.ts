import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Beneficiary} from '../../../models/beneficiary.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
  private apiUrl = 'http://localhost:8080/beneficiary';
  constructor(private http: HttpClient) { }

  getBeneficiary(): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(`${this.apiUrl}`);
  }
  getBeneficiaryById(id: number): Observable<Beneficiary> {
    return this.http.get<Beneficiary>(`${this.apiUrl}/${id}`);
  }
  createBeneficiary(beneficiary: Beneficiary):Observable<Beneficiary> {
    return this.http.post<Beneficiary>(this.apiUrl, beneficiary);
  }
  updateBeneficiary(id: number, beneficiary :Beneficiary):Observable<Beneficiary> {
    return this.http.put<Beneficiary>(`${this.apiUrl}/${id}`, beneficiary)
  }
  deleteBeneficiary(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
