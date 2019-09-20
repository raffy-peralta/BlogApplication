import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Blogs } from 'src/app/models/Blogs';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./blogs.component.css',
  "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"]
})
export class BlogsComponent implements OnInit {
  data: any[];
  blog: any;
  empty: Boolean;
  comment: any;
  id: number;
  users: any[];
  constructor(private blogsService: BlogsService, private modalService: NgbModal, 
    private accountsService: AccountsService) { }

  ngOnInit() {
    this.comment = new FormControl('');
    this.id =  JSON.parse(localStorage.getItem('details')).id;
    this.getUsers();
    this.getBlogs();
  }
  getUsers(){
    this.accountsService.getJSON().subscribe(data=>{
      this.users = data
      console.log(data);
      
    })
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
      console.log(this.data);
      
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

  getUser(id): string{
    var name;
    this.users.forEach(element => {
      if(element.id === id){
        name = element.name;
      }
    });
    return name;
  }
}
