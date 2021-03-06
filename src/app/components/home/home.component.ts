import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { Blogs } from '../../models/Blogs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReversePipe } from 'ngx-pipes';




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
  comment: string;
  edit: boolean;
  blogId: any;
  filter: boolean;
  id: any;
  sort: any[];
  sortValue: any[];
  index: number;
  blogForm: any;
  
  constructor(private authService: AuthService, private blogsService: BlogsService, 
    private modalService: NgbModal, private reversePipe: ReversePipe) { }

  ngOnInit() {
    this.id  = JSON.parse(localStorage.getItem('details')).id;
    this.sort = ['Filter By: ', 'All' , 'Approved', 'Rejected']
    this.sortValue  = [0,0,1,3];
    this.index  = 0;
    this.blogForm = new FormGroup({
      title: new FormControl('',Validators.required),
      blog: new FormControl('',Validators.required)
    });
    this.getBlogs();

  }

  logout(){
    // this.authService.logout();
  }

  setSort(i){
    this.index = i;
    this.getBlogs();
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
    this.empty = true;
    this.blogsService.getJson().subscribe((data)=>{
      this.data = data;    
      // data.forEach(element => {
      //   if(element.userId == this.id){
      //     // this.empty = false;
      //     this.empty = true;
      //     if(((this.index == 0 || this.index == 1) || this.sortValue[this.index] == element.status)){
      //       this.empty = false;
      //       return this.empty;
      //     }
      //     else if(element.length){
            
      //       return this.empty;
      //     }
      //     // return this.empty;
      //   }else{
      //     this.empty = true;
      //     return this.empty;
      //   }
      // });
      for(var i = 0; i < data.length && this.empty != false && data.length != 0; i++){
        // console.log(this.data[i]['title']);
        // console.log(data);
        if(this.data[i]['userId'] == this.id){
          if(((this.index == 0 || this.index == 1)  || this.sortValue[this.index] == this.data[i]['status']) && this.data[i]['status'] != 2 ){
            this.empty = false;
          }else{
            this.empty = true;
          }
        }
      }
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

  editBlog(title, blog, content, id){
    this.edit = true;
    this.blogForm.setValue({
      title: title,
      blog: blog
    });

    this.blogId = id;
    this.openLg(content);
  }

  newBlog(content){
    this.edit = false;

    this.blogForm.reset();
    this.openLg(content);
  }

  saveBlog(){
    if(this.blogForm.valid){
      let json = {
        title: this.blogForm.get('title').value, 
        content: this.blogForm.get('blog').value,
        status: 2,
        dateSubmitted: Date(),
        dateApproved: "",
        userId: JSON.parse(localStorage.getItem('details')).id
      }
      this.blogsService.update(json, this.blogId).subscribe((data)=>{
        this.blogForm.reset();
        this.modalService.dismissAll();
        this.getBlogs();
      });   
    } 
  }

  openComment(content, comment) {
    this.comment = comment;
    console.log(comment);
    
    this.modalService.open(content, { size: 'lg' });
  }
  openLg(content) {
    
    this.modalService.open(content, { size: 'lg' });
  }

}
