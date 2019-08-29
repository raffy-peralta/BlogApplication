import { Component, OnInit } from '@angular/core';
import { Blogs } from 'src/app/models/Blogs';
import { BlogsService } from 'src/app/services/blogs/blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css',
  "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"]
})
export class BlogsComponent implements OnInit {
  data: Blogs;
  empty: Boolean;
  id = JSON.parse(localStorage.getItem('details')).id;
  constructor(private blogsService: BlogsService) { }

  ngOnInit() {
    this.getBlogs();
  }

  approveBlog(id, title, content, dateSubmitted, userId){
    let json = {
      title: title,
      content: content,
      status : 1,
      dateSubmitted: dateSubmitted,
      dateApproved: Date(),
      userId: userId
    };
    this.blogsService.update(json, id).subscribe((data)=>{
      this.getBlogs();
    })
  }

  rejectBlog(id, title, content, dateSubmitted, userId){
    let json = {
      title: title,
      content: content,
      status : 3,
      dateSubmitted: dateSubmitted,
      dateApproved: Date(),
      userId: userId
    };
    this.blogsService.update(json, id).subscribe((data)=>{
      this.getBlogs();
    })
  }
  

  getBlogs(){
    this.empty = true;
    this.blogsService.getJson().subscribe((data)=>{
      this.data = data;    
      let i = 0;
      data.forEach(element => {
        i++;
        console.log(i);
        if(element.status === 2){
          this.empty = false;
        }

      });
    }); 
  }
}
