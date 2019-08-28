import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { Blogs } from '../../models/Blogs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReversePipe } from 'ngx-pipes';
import { ifStmt } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.css',
  "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"],
  providers: [ReversePipe]
})


export class HomeComponent implements OnInit {
  data: Blogs;
  empty: boolean;
  title: String;
  blog: String;
  id = JSON.parse(localStorage.getItem('details')).id;

  blogForm = new FormGroup({
    title: new FormControl('',Validators.required),
    blog: new FormControl('',Validators.required)
  });
  constructor(private authService: AuthService, private blogsService: BlogsService, 
    private modalService: NgbModal, private reversePipe: ReversePipe) { }

  ngOnInit() {
    this.getBlogs();

  }

  logout(){
    // this.authService.logout();
  }

  submitBlog(){
    
    if(this.blogForm.valid){
      let json = {
        title: this.blogForm.get('title').value, 
        content: this.blogForm.get('blog').value,
        status: 2,
        dateSubmitted: Date(),
        dateApproved: "",
        userId: JSON.parse(localStorage.getItem('details')).id
      }
      this.blogsService.save(json).subscribe((data)=>{
        this.blogForm.reset();
        this.modalService.dismissAll();
       
        this.getBlogs();
      });   
    } 
  }

  deleteBlog(id){
    this.blogsService.delete(id).subscribe((data)=>{
      this.getBlogs();
    });
  }
  
  getBlogs(){
    this.empty = false
    this.blogsService.getJson().subscribe((data)=>{
      this.data = data;    
      data.forEach(element => {
        if(element.userId == this.id){
          this.empty = false;
          return this.empty;
        }else{
          this.empty = true;
        }
      });
    }); 
  }

  saveToDrafts(){
    let json = {
      title: this.blogForm.get('title').value, 
      content: this.blogForm.get('blog').value,
      userId: JSON.parse(localStorage.getItem('details')).id
    }

    this.blogsService.saveDrafts(json).subscribe((data)=>{
      this.blogForm.reset();
      this.modalService.dismissAll();
     
    });   

  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

}
