import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const itemString: string | null = localStorage.getItem(key);
    return itemString ? JSON.parse(itemString) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
