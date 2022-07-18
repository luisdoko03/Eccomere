import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAndClientComponent } from './order-and-client.component';

describe('OrderAndClientComponent', () => {
  let component: OrderAndClientComponent;
  let fixture: ComponentFixture<OrderAndClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderAndClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAndClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
