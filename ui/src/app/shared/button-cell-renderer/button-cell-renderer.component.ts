import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-cell-renderer',
  templateUrl: './button-cell-renderer.component.html',
  styleUrls: ['./button-cell-renderer.component.css']
})
export class ButtonCellRendererComponent implements ICellRendererAngularComp {
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler(event: any) {
    this.params.clicked(this.params.data, this.params.context.componentParent);
  }

  refresh() {
    return false;
  }
}
