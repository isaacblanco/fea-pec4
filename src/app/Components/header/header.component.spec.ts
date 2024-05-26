import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { HeaderMenusService } from "src/app/Services/header-menus.service";
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let headerMenusService: HeaderMenusService;
  let localStorageService: LocalStorageService;
  let headerManagementSubject: BehaviorSubject<any>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj("Router", ["navigateByUrl"]);
    headerManagementSubject = new BehaviorSubject({
      // En lugar del observable para simular el comportamiento
      showAuthSection: false,
      showNoAuthSection: true,
    });

    const headerMenusServiceSpy = jasmine.createSpyObj(
      "HeaderMenusService",
      [],
      {
        headerManagement: headerManagementSubject,
      }
    );
    const localStorageServiceSpy = jasmine.createSpyObj("LocalStorageService", [
      "remove",
    ]);

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: Router, useValue: spy },
        { provide: HeaderMenusService, useValue: headerMenusServiceSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    headerMenusService = TestBed.inject(HeaderMenusService);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  // EJERCICIO 1: Que el componente se ha creado correctamente
  it("Comprobación de la creación del componente", () => {
    expect(component).toBeTruthy();
  });

  // Testear la navegación de las rutas
  it("Simulación de la navegación de la ruta", () => {
    const spy = router.navigateByUrl as jasmine.Spy;

    // Array
    const routes = [
      "home",
      "login",
      "register",
      "posts",
      "categories",
      "profile",
    ];

    // Simular la navegación de las rutas
    routes.forEach((route) => {
      component.navigationTo(route); // Del enunciado
      expect(spy).toHaveBeenCalledWith(route); // Del enunciado
    });
  });

  // --- EJERCICIO 5 simulación del logout: ----
  it("EJE 5: Borrar los datos del usuario y hacer un logout", () => {
    const removeSpy = localStorageService.remove as jasmine.Spy;
    const navSpy = router.navigateByUrl as jasmine.Spy;

    component.logout();

    expect(removeSpy).toHaveBeenCalledWith("user_id");
    expect(removeSpy).toHaveBeenCalledWith("access_token");
    expect(navSpy).toHaveBeenCalledWith("home");
  });

  it("EJE 5: debería mostrar los elementos del menú para usuarios autenticados", () => {
    // Simular el cambio de los datos del header
    headerManagementSubject.next({
      showAuthSection: true,
      showNoAuthSection: false,
    });
    fixture.detectChanges();

    // Comprobar que los botones que queremos están presentes por su etiqueta
    const buttons = fixture.debugElement.queryAll(By.css("button"));
    const buttonTexts = buttons.map((button) =>
      button.nativeElement.textContent.trim()
    );

    // Comprobar que los botones que queremos están presentes por su etiqueta
    expect(buttonTexts).toContain("Home");
    expect(buttonTexts).toContain("Admin posts");
    expect(buttonTexts).toContain("Admin categories");
    expect(buttonTexts).toContain("Profile");
    expect(buttonTexts).toContain("Logout");
  });

  it("EJE 5: debería mostrar los elementos del menú para usuarios no autenticados", () => {
    // Simular el cambio de los datos del header
    headerManagementSubject.next({
      showAuthSection: false,
      showNoAuthSection: true,
    });
    fixture.detectChanges();

    // Comprobar que los botones que queremos están presentes por su etiqueta
    const buttons = fixture.debugElement.queryAll(By.css("button"));
    const buttonTexts = buttons.map((button) =>
      button.nativeElement.textContent.trim()
    );

    // Comprobar que los botones que queremos están presentes
    expect(buttonTexts).toContain("Home"); // Aunque al estar siempre visible, no tiene mucho sentido comprobar
    expect(buttonTexts).toContain("Login");
    expect(buttonTexts).toContain("Register");
  });
});
