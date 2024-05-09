import { Injectable } from '@angular/core';
import { Course } from '../interfaces/course';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courses: Course[] = [];

  constructor(private fireStore: Firestore) { }
  // deleteCourse(i: number): void {
  //   this.courses.splice(i, 1);
  // }

  courses$ = new Observable<Course[]>((observer) => {
    observer.next(this.courses);
    observer.complete();
  });

  getCourses(): Observable<Course[]> {
    const coursesCollection = collection(this.fireStore, 'courses');
    const courses = collectionData(coursesCollection, { idField: 'id' });
    return courses as Observable<Course[]>;
  }

  getCourse(id: string): Observable<Course | null> {
    return this.getCourses().pipe(
      map(courses => courses.find(course => course.id === id) || null)
    );
  }

  addCourse(course: Course): void {
    const coursesCollection = collection(this.fireStore, 'courses');
    addDoc(coursesCollection, { ...course });
  }

  deleteCourseById(id: string): void {
    const coursesCollection = collection(this.fireStore, 'courses');
    const document = doc(coursesCollection, id);
    deleteDoc(document);
  }

  addLessonToCourse(course_id: string, course: Course): void {
    const coursesCollection = collection(this.fireStore, 'courses');
    const docRef = doc(coursesCollection, course_id);
    setDoc(docRef, course);
  }

}
