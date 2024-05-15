import { Injectable } from '@angular/core';
import { Request } from '../interfaces/request';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  requests: Request[] = [];
  constructor(private fireStore: Firestore) { }

  requests$ = new Observable<Request[]>((observer) => {
    observer.next(this.requests);
    observer.complete();
  });

  getRequests(): Observable<Request[]> {
    const requestsCollection = collection(this.fireStore, 'requests');
    const courses = collectionData(requestsCollection, { idField: 'request_id' });
    return courses as Observable<Request[]>;
  }

  deleteRequestById(id: string): void {
    const requestsCollection = collection(this.fireStore, 'requests');
    const document = doc(requestsCollection, id);
    deleteDoc(document);
  }

  async addRequest(request: Request): Promise<void> {
    const requestsCollection = collection(this.fireStore, 'requests');
    const docRef: DocumentReference = await addDoc(requestsCollection, { ...request });
    await setDoc(doc(requestsCollection, docRef.id), { ...request, request_id: docRef.id });
  }
}
