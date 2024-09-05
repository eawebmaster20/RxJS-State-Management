import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICart } from '../../interfaces/product-item';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VariablesService } from '../../services/variables.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
    constructor(
      public variables: VariablesService,
    ){
    }
    trackById(index: number, item: ICart) {
      return item.id;
    }
  
    confirmOrder(event: Event) {
      if((event.target as HTMLElement).getAttribute('id') === 'confirmOrder'){
        this.variables.showModal = !this.variables.showModal
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.style.overflow="scroll"
        // this.store.dispatch(clearCart())
      }
    }
}
