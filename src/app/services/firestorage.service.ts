import { Injectable } from '@angular/core';
import { getApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root',
})
export class FirestorageService {
  constructor(private firestorage: AngularFireStorage) {}
  imagesRef: string = '';

  async uploadfile(file: File): Promise<string> {
    this.imagesRef = `images/${file.name + Math.random() * 1000}`;
    let url = '';
    const uploadtask = await this.firestorage
      .upload(this.imagesRef, file)
      .then(async (response) => {
        url = await response.ref.getDownloadURL();
        let progress = (await response.task).bytesTransferred;
        console.log(progress);
      })
      .catch((error) => {
        console.log(error);
      });

    return url;
  }
}
