import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VicidialUserComponent } from './vicidial-user.component';

describe('VicidialUserComponent', () => {
  let component: VicidialUserComponent;
  let fixture: ComponentFixture<VicidialUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VicidialUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VicidialUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
