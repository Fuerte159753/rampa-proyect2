import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfocliComponent } from './infocli.component';

describe('InfocliComponent', () => {
  let component: InfocliComponent;
  let fixture: ComponentFixture<InfocliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfocliComponent]
    });
    fixture = TestBed.createComponent(InfocliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
