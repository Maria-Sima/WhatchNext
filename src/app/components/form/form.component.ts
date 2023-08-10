import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {categoryTypes, cinemaTypes} from '../../api/data/dataTypes';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent {
  @Input() cinemaType: string = '';
  @Input() selectedCategories: string[]=[];
  @Input() specificDescriptors:string='';
  @Input() loading: boolean = false;
  @Output() searchRequested = new EventEmitter<void>();
  @Output() specificDescriptorsChange = new EventEmitter<string>();



  updateSpecificDescriptors(newValue: string) {
    this.specificDescriptors = newValue;
    this.specificDescriptorsChange.emit(this.specificDescriptors);
  }
  performSearch() {
    this.searchRequested.emit();
  }



  categoryTypes = categoryTypes;
  cinemaTypes = cinemaTypes;


  updateCinemaType(newValue: string) {
    this.cinemaType = newValue;
  }

  isChecked(category: string): boolean {
    return this.selectedCategories.includes(category);
  }

  toggleCategorySelection(category: string) {

    console.log(this.specificDescriptors)
    const index = this.selectedCategories.indexOf(category);
    index !== -1 ? this.selectedCategories.splice(index, 1) : this.selectedCategories.push(category);
  }


  toggleLoading() {
    this.loading = !this.loading;
    this.performSearch();
  }


}
