import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { CategoryDTO } from "../Models/category.dto";
import { CategoryService, deleteResponse } from "./category.service";
import { SharedService } from "./shared.service";

describe("CategoryService", () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService, SharedService],
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Comprobar inicio
  });

  // Creación en la llamada servicio
  it("Se ha creado el servicio", () => {
    expect(service).toBeTruthy();
  });

  it("Obtneer categorias por usuarios", () => {
    const mockCategories: CategoryDTO[] = [
      {
        categoryId: "1",
        title: "Demo Category",
        description: "Vacio",
        css_color: "#336699",
        userId: "1",
      },
    ];
    const userId = "1";

    service.getCategoriesByUserId(userId).subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/users/categories/${userId}`
    );
    expect(req.request.method).toBe("GET");
    req.flush(mockCategories);
  });

  it("Se ha creado una categoria", () => {
    const mockCategory: CategoryDTO = {
      categoryId: "1",
      title: "Demo Category",
      description: "Vacio",
      css_color: "#336699",
      userId: "1",
    };

    service.createCategory(mockCategory).subscribe((category) => {
      expect(category).toEqual(mockCategory);
    });

    const req = httpMock.expectOne(`http://localhost:3000/categories`);
    expect(req.request.method).toBe("POST");
    req.flush(mockCategory);
  });

  it("Actualizar categorias por su id", () => {
    const mockCategory: CategoryDTO = {
      categoryId: "1",
      title: "Demo Category",
      description: "Vacio",
      css_color: "#336699",
      userId: "1",
    };
    const categoryId = "1";

    service.getCategoryById(categoryId).subscribe((category) => {
      expect(category).toEqual(mockCategory);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/categories/${categoryId}`
    );
    expect(req.request.method).toBe("GET"); // Obtener la categoría
    req.flush(mockCategory);
  });

  it("Actualizar categoría", () => {
    const mockCategory: CategoryDTO = {
      categoryId: "1",
      title: "Se actualiza Category",
      description: "Nueva des",
      css_color: "#FF007E",
      userId: "1",
    };
    const categoryId = "1";

    service.updateCategory(categoryId, mockCategory).subscribe((category) => {
      expect(category).toEqual(mockCategory);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/categories/${categoryId}`
    );
    expect(req.request.method).toBe("PUT"); // Actualizar
    req.flush(mockCategory);
  });

  it("Debería borrar una categoría", () => {
    const mockResponse: deleteResponse = { affected: 1 };
    const categoryId = "1";

    service.deleteCategory(categoryId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/categories/${categoryId}`
    );
    expect(req.request.method).toBe("DELETE"); // Borrar
    req.flush(mockResponse);
  });
});
