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
  searchTerm: string = '';
  loading = true;

  email = localStorage.getItem('username');

  currentTime: string = '';

  private timeInterval: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users/')
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(this.users);
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to fetch users', err);
          this.loading = false;
        }
      });

    this.timeInterval = setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  viewPost(userId: number): void {
    this.router.navigate([`/post/${userId}`]);
  }

  filteredUsers(): User[] {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.website.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
