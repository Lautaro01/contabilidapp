import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormularioPage } from './formulario.page';

describe('FormularioPage', () => {
  let component: FormularioPage;
  let fixture: ComponentFixture<FormularioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
