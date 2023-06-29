import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ReservationService } from 'src/app/services/reservation.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-add-modify-reservation',
  templateUrl: './add-modify-reservation.component.html',
  styleUrls: ['./add-modify-reservation.component.css']
})
export class AddModifyReservationComponent {
  @Output() completeEmitter = new EventEmitter();
  reserveForm: FormGroup;
  availableTables: any[] = [];
  selectedCities!: any[];
  cities = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
];


	constructor(public activeModal: NgbActiveModal, private reservService: ReservationService, private tableService: TableService) {
    this.tableService.getAvailableTables().subscribe(_res=>{
      this.availableTables = _res;
    })
    this.reserveForm = new FormGroup ({
      customerName: new FormControl(),
      reservationDate: new FormControl(),
      tables: new FormControl()
    });
  }

  saveOrUpdate(){
    this.reservService.createReservation(this.reserveForm.value).subscribe(_res=>{
      this.completeEmitter.emit(_res);      
    },
    _err=>{
      alert("Error in reservation. Please try again.")
    })
  }
	

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}
