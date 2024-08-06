import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Reactions {
  likes: number;
  dislikes: number;
}

interface Post {
  id: number;
  title: string;
  body: string;
  reactions: Reactions;
  tags: string[];
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post | null = null;
  userId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.fetchPost(this.userId);
    });
  }

  fetchPost(userId: number): void {
    this.http.get<Post>(`https://dummyjson.com/posts/${userId}`)
      .subscribe({
        next: (data) => {
          this.post = data;
        },
        error: (err) => {
          console.error('Failed to fetch post', err);
        }
      });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  likePost(): void {
    if (this.post) {
      this.post.reactions.likes++;
    }
  }

  dislikePost(): void {
    if (this.post) {
      this.post.reactions.dislikes++;
    }
  }
}
