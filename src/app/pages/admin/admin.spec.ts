import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminComponent } from './admin';
import { AuthService } from '../../services/auth';
import { OutdoorService } from '../../services/outdoor';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent], // <--- componente vai aqui
      imports: [RouterTestingModule],  // <--- módulos vão aqui
      providers: [AuthService, OutdoorService] // <--- serviços vão aqui
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
