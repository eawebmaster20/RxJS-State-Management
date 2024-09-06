import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { VariablesService } from '../../services/variables.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { BehaviorSubject, find, findIndex, map, Observable, of } from 'rxjs';
import { ICart, IProduct } from '../../interfaces/product-item';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../services/apiservice/api.service';
import { ModelService } from '../../services/model/model.service';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule, 
    ModalComponent,
    MatBadgeModule, 
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  constructor( 
    public modelService:ModelService,
    public variables: VariablesService,
    public dialog: MatDialog
  ){}
}

