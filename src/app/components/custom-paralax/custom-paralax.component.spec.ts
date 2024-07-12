import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomParalaxComponent } from './custom-paralax.component';

describe('CustomParalaxComponent', () => {
  let component: CustomParalaxComponent;
  let fixture: ComponentFixture<CustomParalaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomParalaxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomParalaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
