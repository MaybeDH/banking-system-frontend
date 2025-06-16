import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Profile} from '../../../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/profiles'
  constructor(private http: HttpClient) { }
  getProfiles():Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiUrl}`);
  }
  getProfileById(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/${id}`);
  }
  createProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.apiUrl, profile);
  }
  updateProfile(id : number, profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiUrl}/${id}`, profile);
  }
  deleteProfile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
