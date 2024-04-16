import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can call, for example:
  // public set(key: string, value: any) {
  //   this._storage?.set(key, value);
  // }

  // public get(key: string) {
  //   return this._storage?.get(key);
  // }

  async get<T>(key: string) {

    let payload = (await this.storage.get(key));

    return payload as T;
  }

  async remove(key: string) {
    await this.storage.remove(key);
  }

  async set(key: string, val: any) {

    let payload = val;

    await this.storage.set(key, payload);
  }
}
