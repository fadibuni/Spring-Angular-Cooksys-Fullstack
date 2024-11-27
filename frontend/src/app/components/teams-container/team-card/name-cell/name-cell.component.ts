import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-name-cell',
  templateUrl: './name-cell.component.html',
  styleUrls: ['./name-cell.component.css']
})
export class NameCellComponent {
  @Input() name: any;
}
