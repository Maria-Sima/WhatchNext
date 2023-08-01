import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommandationCardComponent } from './recommandation-card.component';

describe('RecommandationCardComponent', () => {
  let component: RecommandationCardComponent;
  let fixture: ComponentFixture<RecommandationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommandationCardComponent]
    });
    fixture = TestBed.createComponent(RecommandationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
