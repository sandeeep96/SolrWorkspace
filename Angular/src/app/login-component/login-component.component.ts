import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  userMsg: boolean = false;
  loading = false;

  constructor(public router: Router, private user: UserService) { }

  dbUserName;
  dbUserPassword;
  viewUserName;
  viewUserPassword;
  forms;
  ngOnInit() {
    console.log('hit on login component');
    this.forms = new FormGroup({
      User: new FormControl(""),
      Password: new FormControl(""),
    });
  }
  
  // getting the username and password feilds
  loginUser(forms) {
    this.loading = true;
    // e.preventDefault();
    //console.log(forms.User,forms.Password);
    // this.viewUser.name = e.target.elements[1].value;
    // this.viewUser.password = e.target.elements[2].value;
    this.viewUserName = forms.User;
    this.viewUserPassword = forms.Password;
    console.log("view---" + this.viewUserName, this.viewUserPassword);
    this.user.getUserDetails(this.viewUserName)
      .then(data => {
        // console.log(data);
        // console.log(data[0].name);
        // console.log(data[0].password);
        this.dbUserName = data[0].name;
        this.dbUserPassword = data[0].password;
        console.log("db---" + this.dbUserName, this.dbUserPassword);
        // this.dbUser=data;
        // console.log("db"+this.dbUser.name);
        // console.log("db"+this.dbUser.password);
        this.validateDetails();

      }).catch(error => {
        // TODO: add real error handling
        //console.log(error);
        this.userMsg = true;
        this.loading = false;
      });
  }
  
  // validating username and password against the DB username and password
  validateDetails() {
    if ((this.viewUserName == this.dbUserName) && (this.viewUserPassword == this.dbUserPassword)) {
      console.log("inside if");
      this.user.setUserLoggedIn(this.viewUserName);
      this.router.navigate(['home']);
    }
    else {
      this.userMsg = true;
      this.loading = false;
      console.log('inside else');
    }
  }
}
