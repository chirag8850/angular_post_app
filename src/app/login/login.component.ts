import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import sha1 from 'sha1';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      localStorage.setItem('username', username);
      localStorage.setItem('password', sha1(password));
      this.router.navigate(['/users']);
    }
  }
}
