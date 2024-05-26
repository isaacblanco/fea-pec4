import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { PostDTO } from "../Models/post.dto";
import { PostService, deleteResponse } from "./post.service";
import { SharedService } from "./shared.service";

describe("PostService", () => {
  let service: PostService;
  let httpMock: HttpTestingController; // Falso http

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService, SharedService],
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  //
  afterEach(() => {
    httpMock.verify();
  });

  // Creación del servicio
  it("Se ha creado el servicio post", () => {
    expect(service).toBeTruthy();
  });

  // Obtener posts por usuario
  it("Obtener posts (al menos el mockPost)", () => {
    const mockPosts: PostDTO[] = [
      {
        postId: "1",
        title: "Test Post",
        description: "Test Content",
        num_likes: 10,
        num_dislikes: 1,
        publication_date: new Date(),
        categories: [],
        userId: "1",
        userAlias: "testuser",
      },
    ];

    service.getPosts().subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne("http://localhost:3000/posts");
    expect(req.request.method).toBe("GET");
    req.flush(mockPosts);
  });

  // Obtener los post de id de usuario
  it("Obtener posts por el id de usuario", () => {
    const mockPosts: PostDTO[] = [
      {
        postId: "1",
        title: "Test Post",
        description: "Test Content",
        num_likes: 10,
        num_dislikes: 1,
        publication_date: new Date(),
        categories: [],
        userId: "1",
        userAlias: "testuser",
      },
    ];
    const userId = "1";

    service.getPostsByUserId(userId).subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/users/posts/${userId}`
    );
    expect(req.request.method).toBe("GET");
    req.flush(mockPosts);
  });

  // Creación de un post
  it("Creación de un post", () => {
    const mockPost: PostDTO = {
      postId: "1",
      title: "Test Post",
      description: "Test Content",
      num_likes: 10,
      num_dislikes: 1,
      publication_date: new Date(),
      categories: [],
      userId: "1",
      userAlias: "testuser",
    };

    service.createPost(mockPost).subscribe((post) => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne("http://localhost:3000/posts");
    expect(req.request.method).toBe("POST");
    req.flush(mockPost);
  });

  // Obtener un post por su ID
  it("Obtener posr por su ID", () => {
    const mockPost: PostDTO = {
      postId: "1",
      title: "Test Post",
      description: "Test Content",
      num_likes: 10,
      num_dislikes: 1,
      publication_date: new Date(),
      categories: [],
      userId: "1",
      userAlias: "testuser",
    };
    const postId = "1";

    service.getPostById(postId).subscribe((post) => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`http://localhost:3000/posts/${postId}`);
    expect(req.request.method).toBe("GET");
    req.flush(mockPost);
  });

  // Actualizar un post
  it("Actualizar un post", () => {
    const mockPost: PostDTO = {
      postId: "1",
      title: "Updated Post",
      description: "Updated Content",
      num_likes: 20,
      num_dislikes: 2,
      publication_date: new Date(),
      categories: [],
      userId: "1",
      userAlias: "testuser",
    };
    const postId = "1";

    service.updatePost(postId, mockPost).subscribe((post) => {
      expect(post).toEqual(mockPost);
    });
    const req = httpMock.expectOne(`http://localhost:3000/posts/${postId}`);
    expect(req.request.method).toBe("PUT");
    req.flush(mockPost);
  });

  // Borrar un post
  it("Borrar un post", () => {
    const mockResponse: deleteResponse = { affected: 1 };
    const postId = "1";

    service.deletePost(postId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:3000/posts/${postId}`);
    expect(req.request.method).toBe("DELETE");
    req.flush(mockResponse);
  });
});
