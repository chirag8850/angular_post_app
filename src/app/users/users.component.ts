import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users/')
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(this.users);
        },
        error: (err) => {
          console.error('Failed to fetch users', err);
        }
      });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  viewPost(userId: number): void {
    this.router.navigate([`/post/${userId}`]);
  }
}
