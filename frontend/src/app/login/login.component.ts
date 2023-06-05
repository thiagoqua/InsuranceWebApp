import { Component, WritableSignal, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { LoginRequest } from '../models/LoginRequest';
import { AuthenticationService } from '../services/authentication.service';
import { Admin } from '../models/Admin';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public hide:WritableSignal<boolean>;
  public form:FormGroup;

  constructor(private service:AuthenticationService,
              private router:Router){
    this.hide = signal(true);
    this.form = new FormGroup({
      username:new FormControl(),
      password:new FormControl()
    });
  }

  getErrorMessage(controlName:string):string{
    const control:AbstractControl = this.form.controls[controlName];
    if(control.hasError('required'))
      return 'Complete este campo';
    else if(control.hasError('invalid'))
      return 'Usuario y/o contraseña inválidos';
    return '';
  }

  handleSubmit():void{
    const request:LoginRequest = new LoginRequest(
      this.form.get('username')!.value,
      this.form.get('password')!.value
    )    
    this.service.authenticate(request).subscribe({
      next: (data:Admin) => {
        this.service.userLogged = data;
        this.router.navigate(['/']);
      },
      error: (err:HttpErrorResponse) => {
        console.log(err)
        if(err.status == 400){
          this.form.controls['username'].setErrors({'invalid':true});
          this.form.controls['password'].setErrors({'invalid':true});
        }
      }
    })
  }
}
