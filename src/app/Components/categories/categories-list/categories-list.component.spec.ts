import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { CategoryDTO } from "src/app/Models/category.dto";
import { CategoryService } from "src/app/Services/category.service";
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { SharedService } from "src/app/Services/shared.service";
import { CategoriesListComponent } from "./categories-list.component";

describe("CategoriesListComponent", () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;
  let categoryService: jasmine.SpyObj<CategoryService>;
  let router: jasmine.SpyObj<Router>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let sharedService: jasmine.SpyObj<SharedService>;

  beforeEach(async () => {
    const categoryServiceSpy = jasmine.createSpyObj("CategoryService", [
      "getCategoriesByUserId",
      "deleteCategory",
    ]);
    const routerSpy = jasmine.createSpyObj("Router", ["navigateByUrl"]);
    const localStorageServiceSpy = jasmine.createSpyObj("LocalStorageService", [
      "get",
    ]);
    const sharedServiceSpy = jasmine.createSpyObj("SharedService", [
      "errorLog",
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CategoriesListComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
        { provide: SharedService, useValue: sharedServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(
      CategoryService
    ) as jasmine.SpyObj<CategoryService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    localStorageService = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;
    sharedService = TestBed.inject(
      SharedService
    ) as jasmine.SpyObj<SharedService>;
  });

  // un test que valide que se crea el componente correctamente
  it("debería crear el componente", () => {
    expect(component).toBeTruthy();
  });

  // que cuando se lance el loadCategories se lance la llamada getCategoriesByUserId del servicio
  it("debería cargar las categorías al iniciar", () => {
    const mockCategories: CategoryDTO[] = [
      {
        categoryId: "1",
        title: "Test Category",
        description: "Description",
        css_color: "#000000",
        userId: "123",
      },
    ];
    localStorageService.get.and.returnValue("123");
    categoryService.getCategoriesByUserId.and.returnValue(of(mockCategories)); // <<-- AQUI 1

    component.loadCategories();

    expect(categoryService.getCategoriesByUserId).toHaveBeenCalledWith("123");
    expect(component.categories).toEqual(mockCategories); // que la respuesta de la llamada sea la esperada
  });

  // un test que valide que se lanza el navigateByUrl con el argumento correcto cuando creamos una categoría
  it("debería navegar para crear una categoría", () => {
    component.createCategory();
    expect(router.navigateByUrl).toHaveBeenCalledWith("/user/category/");
  });

  // un test que valide que se lanza el navigateByUrl con el argumento correcto cuando actualicemos una categoría
  it("debería navegar para actualizar una categoría", () => {
    const categoryId = "1";
    component.updateCategory(categoryId);
    expect(router.navigateByUrl).toHaveBeenCalledWith(
      "/user/category/" + categoryId
    );
  });
});
