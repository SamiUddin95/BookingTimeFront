import { Component, inject } from '@angular/core'
import { roomDetailList } from './data'
import { AdminService } from '@/app/core/services/api/admin.service'
import { ActivatedRoute, Router } from '@angular/router'
import {FormsModule,ReactiveFormsModule,UntypedFormBuilder,Validators,UntypedFormGroup} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './detail.component.html',
  styles: ``,
})
export class UserDetailsComponent {
  constructor(private route: ActivatedRoute,private router: Router,private toastr: ToastrService) { }
  private adminService = inject(AdminService)
  roomDetailList = roomDetailList
  urlId: any;
  ngOnInit(): void {
    this.urlId = this.route.snapshot.paramMap.get('id');
    this.loadUsers();
    this.loadGroups();
  }
  userList:any=[];
  reqBody = {
    user: {
      email: '',
      fullName: '',
      isVerified: false,
    },
    groupId: {
      groupId: null
    }
  };

  loadUsers() {
    // this.reqBody.paginationInfo = {}
    this.adminService.GetUserDetailById(Number(this.urlId)).subscribe(((res: any) => {
      this.reqBody = res;
      this.reqBody.groupId=res?.groupId?.groupId?res?.groupId?.groupId:0;
    }))
  }
  groupList:any=[];
  loadGroups(){
     this.adminService.GetAllGroupList().subscribe(((res: any) => {
      this.groupList = res;
    }))
  }
  updateUser(){
    let data:any={
      userId:this.urlId,
      email:this.reqBody.user.email,
      isVerified:this.reqBody.user.isVerified,
      groupId:this.reqBody.groupId,
      fullName:this.reqBody.user.fullName
    };
    this.adminService.UpdateUser(data).subscribe(((res:any)=>{
      if(res.code==200){
        this.router.navigate(["admin/users/list"]);
        this.toastr.success("User Updated successfully!",'Updation Success');
      }
    }))
  }
  cancel(){
    this.router.navigate(["admin/users/list"]);
  }
}
