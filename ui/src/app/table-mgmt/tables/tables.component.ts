import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { TableService } from 'src/app/services/table.service';
import { AddModifyTableComponent } from './add-modify-table/add-modify-table.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent {
  
  public rowData$!: Observable<any[]>;
  public columnDefs: ColDef[] = [
    { field: 'id'},
    { field: 'tableName'},
    { field: 'capacity' },
    { field: 'availability'}
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

   // For accessing the Grid's API
   @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  

  constructor(private tableService:TableService, 
    private http: HttpClient,
    private modalService: NgbModal) {
  }

  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    //this.rowData$ = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
   this.rowData$ = this.tableService.getAllTables();
  }

  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  newTable(){
    const modalRef = this.modalService.open(AddModifyTableComponent);
    modalRef.componentInstance.completeEmitter.subscribe((_res:any)=>{
      this.rowData$ = this.tableService.getAllTables();
      modalRef.close();

    })
  }

}
