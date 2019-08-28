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
  providers: [ReversePipe]
})
export class DraftComponent implements OnInit {
  data: any[];

  constructor(private blogsService: BlogsService) { }

  ngOnInit() {
    this.getBlogs();
  }
  getBlogs(){
    
    this.blogsService.getDrafts().subscribe((data)=>{
      this.data = data;
    });
  }
}
