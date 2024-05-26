import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { PostDTO } from "src/app/Models/post.dto";
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { PostService } from "src/app/Services/post.service";
import { SharedService } from "src/app/Services/shared.service";
import { PostsListComponent } from "./posts-list.component";

describe("PostsListComponent", () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let router: jasmine.SpyObj<Router>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let sharedService: jasmine.SpyObj<SharedService>;

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj("PostService", [
      "getPostsByUserId",
      "deletePost",
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
      declarations: [PostsListComponent],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
        { provide: SharedService, useValue: sharedServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
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

  // un test que nos asegure dos cosas: cargar y respuesta
  it("debería cargar las publicaciones al iniciar", () => {
    const mockPosts: PostDTO[] = [
      {
        postId: "1",
        title: "Test Post",
        description: "Test Content",
        num_likes: 68,
        num_dislikes: 1,
        publication_date: new Date(),
        categories: [],
        userId: "1",
        userAlias: "iblanco",
      },
    ];
    localStorageService.get.and.returnValue("1");
    postService.getPostsByUserId.and.returnValue(of(mockPosts));

    component.loadPosts();

    // que cuando se lance el loadPosts se lance la llamada getPostsByUserId del servicio
    expect(postService.getPostsByUserId).toHaveBeenCalledWith("1");
    expect(component.posts).toEqual(mockPosts);
  });

  // un test que valide que se lanza el navigateByUrl con el argumento correcto cuando creamos un post
  it("debería navegar para crear una publicación", () => {
    component.createPost();
    expect(router.navigateByUrl).toHaveBeenCalledWith("/user/post/");
  });

  // un test que valide que se lanza el navigateByUrl con el argumento correcto cuando actualicemos un post
  it("debería navegar para actualizar una publicación", () => {
    const postId = "1";
    component.updatePost(postId);
    expect(router.navigateByUrl).toHaveBeenCalledWith("/user/post/" + postId);
  });
});
