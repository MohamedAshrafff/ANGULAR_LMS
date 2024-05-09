import { Injectable } from '@angular/core';
import { Query, Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [];
  currentUser: User | null = null;
  constructor(private fireStore: Firestore, private router: Router) { }
  // deleteCourse(i: number): void {
  //   this.courses.splice(i, 1);
  // }

  users$ = new Observable<User[]>((observer) => {
    observer.next(this.users);
    observer.complete();
  });

  getUsers(): Observable<User[]> {
    const usersCollection = collection(this.fireStore, 'users');
    const users = collectionData(usersCollection, { idField: 'id' });
    return users as Observable<User[]>;
  }

  getSingleUser(id: string): Observable<User | null> {
    return this.getUsers().pipe(
      map(users => users.find(user => user.id === id) || null)
    );
  }

  deleteUserId(id: string): void {
    const usersCollection = collection(this.fireStore, 'users');
    const document = doc(usersCollection, id);
    deleteDoc(document);
  }


  registerUser(user: User): void {
    const usersCollection = collection(this.fireStore, 'users');
    addDoc(usersCollection, { ...user });
  }

  editUser(id: string, user: User): void {
    const usersCollection = collection(this.fireStore, 'users');
    const docRef = doc(usersCollection, id);
    setDoc(docRef, user);
  }

  checkUser(email: string, password: string): Observable<User | null> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find(user => user.email === email);
        if (user) {
          if (user.password === password) {
            this.currentUser = user;
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      }));
  }

  isEmailUnique(email: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find(user => user.email === email);
        if (user) {
          return false;
        } else {
          return true;
        }
      }));
  }

  Logout(): void {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      localStorage.removeItem('currentUser');
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          title: "Logged Out Successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/log-in']);
      }
    });
  }

}
