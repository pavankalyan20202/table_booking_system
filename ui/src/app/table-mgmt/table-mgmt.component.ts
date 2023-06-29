import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-mgmt',
  templateUrl: './table-mgmt.component.html',
  styleUrls: ['./table-mgmt.component.css']
})
export class TableMgmtComponent implements AfterViewInit {
  active:string = "reservations";

  constructor(private router: Router) {
    
  }

  ngAfterViewInit(): void {
    this.router.navigate(["/"+this.active]);
  }

  navigate(){
    this.router.navigate(["/"+this.active]);
  }
}
