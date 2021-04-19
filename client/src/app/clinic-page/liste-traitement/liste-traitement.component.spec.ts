import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTraitementComponent } from './liste-traitement.component';

describe('ListeTraitementComponent', () => {
  let component: ListeTraitementComponent;
  let fixture: ComponentFixture<ListeTraitementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeTraitementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
