import { CommonService } from '@/app/core/services/api/common.service';
import { UserService } from '@/app/core/services/api/user.service';
import { AppServiceService } from '@/app/services/app-service.service';
import { credits, currentYear } from '@/app/store';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {FormsModule,ReactiveFormsModule,UntypedFormBuilder,Validators,UntypedFormGroup} from '@angular/forms';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

interface JwtPayload {
  sub: string;
  jti: string;
  name: string;
  IsVerified: string;
  GroupId: string;
  exp: number; // expiration time (Unix timestamp)
}

@Component({
  selector: 'auth-sign-in',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styles: `
    :host(auth-sign-in) {
      display: contents;
    }
  `,
})
export class SignInComponent {
  creditsBy = credits;
  currentYear = currentYear;
  signinForm!: UntypedFormGroup;
  submitted: boolean = false;
  passwordType: boolean = true;

  public fb = inject(UntypedFormBuilder);
  public store = inject(Store);
  public toastr = inject(ToastrService);

  constructor(private app:CommonService,private router: Router,
    private jwtHelper: JwtHelperService,private route: ActivatedRoute,) {
    // this.signinForm = this.fb.group({
    //   Email: ['', [Validators.required, Validators.email]],
    //   Password: ['', [Validators.required]],
    // });
  }

  // get form() {
  //   return this.signinForm.controls;
  // }

  userModel:any={}
  onLogin() {
    this.app.login(this.userModel).subscribe(res=>{
      if(res.code===200){
        localStorage.setItem('token', res.token);
        const token = localStorage.getItem('token');
        if (token) {
          const decoded=this.jwtHelper.decodeToken(token);
          console.log('Email:', decoded.sub);
          console.log('IsVerified:', decoded.IsVerified);
          console.log('GroupId:', decoded.GroupId);
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'admin/users/list';
          this.router.navigateByUrl(returnUrl);
          // this.router.navigate(['admin/users/list']);
          // this.router.navigate(['hotels/home']);
          this.toastr.success("User logged in successfully!",'Login Success');
        }
      }else
      if(res.code!=200)
        this.toastr.error(res?.msg,'Login Error');
    },err=>{
      this.toastr.error(err.msg,err);
    })
  }
  

  changeType() {
    this.passwordType = !this.passwordType;
  }
}
