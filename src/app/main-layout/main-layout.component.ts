import { Component, OnInit } from '@angular/core';
import  { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  user: any = {};
  usu: any = {};
  loggedIn: boolean = false;
  model = ''; 

  submitted = false;

  onSubmit() { 
    console.log(this.model);

    if (!this.model.trim()) {
      return;
    }

    this.submitted = true; 
    this.router.navigate(['/listBoards/', this.model]);

  }

  //"node_modules/popper.js/dist/umd/popper.min.js",
  //"node_modules/jquery/dist/jquery.slim.min.js"
  //"node_modules/bootstrap/dist/js/bootstrap.min.js"
  //"node_modules/bootstrap/dist/css/bootstrap.min.css"
  // key: 06261cafb4248aa4a6b7cdf2d6f50c14
  //token: 87521241d1650ee66209ff35849a194ca961ce66f17232c4fdcdbef69a92795b

  constructor(public authService: AuthService,private router: Router) { }

  ngOnInit() {
  }


  login(){
    this.authService.login().then(
      rsp => {
        console.log(rsp);
        this.user = rsp.user;
        this.model = this.user.displayName;
        this.loggedIn = true;
      }
    );
  
  }

  loginFb(){
  this.authService.loginFb().then(
    rsp => {
      console.log(rsp);
      this.user = rsp.user;
      this.model = this.user.displayName;
      this.loggedIn = true;
    }
  );
  }

  loginDummy(){
    this.loggedIn = true;
  }

}
