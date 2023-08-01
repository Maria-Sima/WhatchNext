import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {categoryTypes, cinemaTypes} from '../../data/dataTypes';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent {
  cinemaType: string = '';
  selectedCategories: string[] = [];
  specificDescriptors: string = '';
  loading: boolean = false;

  categoryTypes = categoryTypes;
  cinemaTypes = cinemaTypes;

  @Output() cinemaTypeChange = new EventEmitter<string>();
  @Output() selectedCategoriesChange = new EventEmitter<string[]>();
  @Output() specificDescriptorsChange = new EventEmitter<string>();
  @Output() loadingChange = new EventEmitter<boolean>();

  emitCinemaTypeChange() {
    this.cinemaTypeChange.emit(this.cinemaType);
  }

  // Method to emit changes for selectedCategories
  emitSelectedCategoriesChange() {
    this.selectedCategoriesChange.emit(this.selectedCategories);
  }

  // Method to emit changes for specificDescriptors
  emitSpecificDescriptorsChange() {
    this.specificDescriptorsChange.emit(this.specificDescriptors);
  }

  // Method to emit changes for loading
  emitLoadingChange() {
    this.loadingChange.emit(this.loading);
  }


}
