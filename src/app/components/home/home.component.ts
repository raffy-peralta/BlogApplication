import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { Blogs } from '../../models/Blogs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
  "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"]
})
export class HomeComponent implements OnInit {
  data: Blogs;
  constructor(private authService: AuthService, private blogsService: BlogsService) { }

  ngOnInit() {
    this.getBlogs();
  }

  logout(){
    // this.authService.logout();
  }
  
  getBlogs(){
    this.blogsService.getJson().subscribe((data)=>{
      this.data = data;
    });
  }

}
