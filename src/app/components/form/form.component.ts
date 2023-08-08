import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {categoryTypes, cinemaTypes} from '../../data/dataTypes';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent {
  @Input() cinemaType: string = '';
  @Input() selectedCategories: string[]=[];
  @Input() specificDescriptors: string = '';
  @Input() loading: boolean = false;


  @Output() searchRequested = new EventEmitter<void>();

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

    let selectedCategories: string[] = this.selectedCategories;
    console.log('selectedCategories ='+ selectedCategories+' '+ typeof selectedCategories)

    // if (this.selectedCategories.includes(category)) {
    //  this.selectedCategories.filter(selection=>selection!=category);
    // } else {
    //
    //   this.selectedCategories.push(category);
    //
    // }
  }


  toggleLoading() {
    this.loading = !this.loading;
    this.performSearch();
  }


}
