import { Component, EventEmitter, Output } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-add-modify-table',
  templateUrl: './add-modify-table.component.html',
  styleUrls: ['./add-modify-table.component.css']
})
export class AddModifyTableComponent {
  @Output() completeEmitter = new EventEmitter();
  tableForm: FormGroup;

	constructor(public activeModal: NgbActiveModal, private tableService: TableService) {
    this.tableForm = new FormGroup ({
      tableName: new FormControl(),
      capacity: new FormControl(),
      availability: new FormControl()
    });
  }

  saveOrUpdate(){
    this.tableService.createTable(this.tableForm.value).subscribe(_res=>{
      this.completeEmitter.emit(_res);      
    },
    _err=>{
      alert("Table already exist with same name.")
    })
  }
	

}
