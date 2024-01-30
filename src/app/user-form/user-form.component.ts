import { Component, OnInit } from '@angular/core';
import { IUser } from '../Interface/userInterface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  IUserArr: IUser[] = [];
  iUser: IUser;
  searchTxt: string;
  sortBy: string;
  userId: number;
  id: number;
  page:number;
  itemsPerPage:number;

  constructor() {
    this.id = 1;
    this.iUser = new IUser();
    this.searchTxt = '';
    this.sortBy = '';
    this.userId = 0;
    this.page =1;
    this.itemsPerPage =5;
  }


  ngOnInit(): void {
    this.getAllData();
  }

  saveUserData() {

    const isData = localStorage.getItem('userData');
    if (isData == null) {
      const newArr = [];
      this.iUser.userId = 0;
      newArr.push(this.iUser);
      localStorage.setItem("userData", JSON.stringify(newArr));
    }
    else {
      const oldData = JSON.parse(isData);
      const newId = oldData.length + 1;
      this.iUser.userId = newId;
      oldData.push(this.iUser);
      localStorage.setItem("userData", JSON.stringify(oldData));
    }
    this.iUser = new IUser();
    this.getAllData();
  }

  getAllData() {
    const isData = localStorage.getItem("userData");
    if (isData != null) {
      const localData = JSON.parse(isData);
      this.IUserArr = localData;
    }
  }

  onEdit(item: IUser) {

    this.iUser ={...item};
  }

  onClear() {
    this.iUser = {};
  }

  onDelete(item: IUser) {
    confirm("Are you sure to delete this record");
    const isData = localStorage.getItem("userData");
    if (isData != null) {
      const localData = JSON.parse(isData);
      for (let i = 0; i < localData.length; i++) {
        debugger
        if (localData[i].userId == item.userId) {
          localData.splice(i, 1);
        }
      }
      localStorage.setItem("userData", JSON.stringify(localData));
      this.getAllData();
    }
  }

  searchFun() {
    const isData = localStorage.getItem("userData");
    if (isData != null) {
      const localData = JSON.parse(isData);
      if (this.sortBy == "Name") {
        const filterdData = localData.filter((m: IUser) => m.User_Name?.toLocaleLowerCase().startsWith(this.searchTxt));
        this.IUserArr = filterdData;
      }
      if (this.sortBy == "Email") {
        const filterdData = localData.filter((m: IUser) => m.User_Email?.toLocaleLowerCase().startsWith(this.searchTxt));
        this.IUserArr = filterdData;
      }
    }
  }

}
