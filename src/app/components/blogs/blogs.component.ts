import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Blogs } from 'src/app/models/Blogs';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./blogs.component.css',
  "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"]
})
export class BlogsComponent implements OnInit {
  data: Blogs;
  blog: any;
  empty: Boolean;
  comment = new FormControl('');
  id = JSON.parse(localStorage.getItem('details')).id;
  constructor(private blogsService: BlogsService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getBlogs();
  }

  approveBlog(id, title, content, dateSubmitted, userId, comment){
    let json = {
      title: title,
      content: content,
      status : 1,
      dateSubmitted: dateSubmitted,
      dateApproved: Date(),
      userId: userId,
      comment: comment
    };
    this.blogsService.update(json, id).subscribe((data)=>{
      this.getBlogs();
    })
  }

  rejectBlog(id, title, content, dateSubmitted, userId, comment){
    let json = {
      title: title,
      content: content,
      status : 3,
      dateSubmitted: dateSubmitted,
      dateApproved: Date(),
      userId: userId,
      comment: comment
    };
    this.blogsService.update(json, id).subscribe((data)=>{
      this.getBlogs();
    })
  }
  
  addComment(content, blog) {
    this.blog = blog;
    this.comment.setValue(blog.comment);
    // console.log(this.blog);
    
    this.modalService.open(content, { size: 'lg' });
  }
  
  submitComment(){
    let json = {
      title: this.blog.title,
      content: this.blog.content,
      status: this.blog.status,
      dateSubmitted: this.blog.dateSubmitted,
      dateApproved: this.blog.dateApproved,
      userId: this.blog.userId,
      comment: this.comment.value
    }

    this.blogsService.update(json, this.blog.id).subscribe((data)=>{
      this.getBlogs();
      this.modalService.dismissAll();

    });
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
