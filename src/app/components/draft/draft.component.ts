import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { Blogs } from '../../models/Blogs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReversePipe } from 'ngx-pipes';
import { ifStmt } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css',
  "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"],
  encapsulation: ViewEncapsulation.None,
  providers: [ReversePipe]
})
export class DraftComponent implements OnInit {
  data: any[];
  empty: boolean;
  editable: boolean;
  id: number;
  blogForm: any;
  currentDraft: number;
  

  constructor(private blogsService: BlogsService, private modalService: NgbModal) { }

  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('details')).id;

    this.blogForm = new FormGroup({
      title: new FormControl('',Validators.required),
      blog: new FormControl('',Validators.required)
    });
    this.getBlogs();

  }
  getBlogs(){
    this.empty = false;
    this.blogsService.getDrafts().subscribe((data)=>{
      this.data = data;
      if(this.data.length != 0){
        data.forEach(element => {
          if(element.userId == this.id){
            this.empty = false;
            // console.log(this.empty)
            return this.empty;
          }else{
            this.empty = true;
            // console.log(this.empty)
          }
        });
      }else{
        this.empty = true;
      }
    });   
  }

  deleteDraft(id){
    this.blogsService.deleteDraft(id).subscribe((data)=>{
      this.getBlogs();
    });
  }

  openLg(content, title, blog, id) {
    this.blogForm.reset();
    this.blogForm.setValue({
      title: title,
      blog: blog
    });
    this.currentDraft = id
    this.modalService.open(content, { size: 'lg' });
    
  }

  submitDraft(){
    this.submit(this.blogForm.get('title').value, this.blogForm.get('blog').value, this.currentDraft)
    this.blogForm.reset();
    this.modalService.dismissAll();
    this.getBlogs();
  }

  saveToDrafts(){
    let json = {
      title: this.blogForm.get('title').value, 
      content: this.blogForm.get('blog').value,
      userId: JSON.parse(localStorage.getItem('details')).id
    }
    
    this.blogsService.editDraft(json, this.currentDraft).subscribe((data)=>{
      this.blogForm.reset();
      this.modalService.dismissAll();
      this.getBlogs();
    });
  }

  submit(title, content, id){
    let json = {
      title: title,
      content: content,
      status: 2,
      dateSubmitted: Date(),
      dateApproved: "",
      userId: JSON.parse(localStorage.getItem('details')).id
    }

    this.blogsService.save(json).subscribe((data)=>{
      this.blogsService.deleteDraft(id).subscribe((data)=>{
        this.getBlogs();
      });
    }); 
  }

}
