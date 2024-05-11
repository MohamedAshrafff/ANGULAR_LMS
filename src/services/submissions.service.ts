import { Injectable } from '@angular/core';
import { Submission } from '../interfaces/submissions';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmissionsService {
  submissions: Submission[] = [];
  constructor(private fireStore: Firestore) { }

  submissions$ = new Observable<Submission[]>((observer) => {
    observer.next(this.submissions);
    observer.complete();
  });

  getSubmissions(): Observable<Submission[]> {
    const submissionsCollection = collection(this.fireStore, 'submissions');
    const courses = collectionData(submissionsCollection, { idField: 'id' });
    return courses as Observable<Submission[]>;
  }

  addSubmission(submission: Submission): void {
    const submissionsCollection = collection(this.fireStore, 'submissions');
    addDoc(submissionsCollection, { ...submission });
  }

  getSubmission(id: string): Observable<Submission | null> {
    return this.getSubmissions().pipe(
      map(submissions => submissions.find(submission => submission.id === id) || null)
    );
  }

  editSubmission(id: string, submission: Submission): void {
    const submissionsCollection = collection(this.fireStore, 'submissions');
    const docRef = doc(submissionsCollection, id);
    setDoc(docRef, submission);
  }
}
