import { Component, inject } from '@angular/core'
import { guestsList } from './data'
import { NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { SelectFormInputDirective } from '@/app/components/form/select-form-input.directive'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AdminService } from '@/app/core/services/api/admin.service'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgbNavModule,
    SelectFormInputDirective,
    CommonModule,
    NgbPaginationModule,
    RouterModule,
  ],
  templateUrl: './list.component.html',
  styles: ``,
})
export class UserListsComponent {
  private adminService = inject(AdminService)
  page = 2
  guestsListData = guestsList

  ngOnInit(): void {
    this.loadUsers()
  }
  userList:any=[];
  reqBody: any = {}
  loadUsers() {
    this.reqBody.paginationInfo = {}
    this.adminService.GetAllUserList().subscribe(((res: any) => {
      this.userList = res;
      console.log(res);
    }))
  }
}
