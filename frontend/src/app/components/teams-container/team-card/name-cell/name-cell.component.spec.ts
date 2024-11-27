import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameCellComponent } from './name-cell.component';

describe('NameCellComponent', () => {
  let component: NameCellComponent;
  let fixture: ComponentFixture<NameCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
