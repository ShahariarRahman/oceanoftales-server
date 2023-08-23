# Ocean Of Tales

- Live Frontend : [oceanoftales-client](https://oceanoftales.web.app)
- Live Backend : [oceanoftales-server](https://oceanoftales.vercel.app)
- Frontend Github : [source-code-oceanoftales-client](https://github.com/ShahariarRahman/oceanoftales-client)

### Application Routes:

### Auth

- Route: https://oceanoftales.vercel.app/api/v1/auth/sign-up (POST) ✅
- Route: https://oceanoftales.vercel.app/api/v1/auth/sign-in (POST) ✅
- Route: https://oceanoftales.vercel.app/api/v1/auth/state (GET) ✅
- Route: https://oceanoftales.vercel.app/api/v1/auth/sign-out (POST) ✅
- Route: https://oceanoftales.vercel.app/api/v1/auth/refresh-token (POST) ✅

### Books

- Route: https://oceanoftales.vercel.app/api/v1/books/:id (GET) ✅
- Route: https://oceanoftales.vercel.app/api/v1/books/:id (DELETE) ✅
- Route: https://oceanoftales.vercel.app/api/v1/books/:id (PATCH) ✅
- Route: https://oceanoftales.vercel.app/api/v1/books (GET) ✅
- - Route: https://oceanoftales.vercel.app/api/v1/books?searchTerm=Romance (GET) ✅
- - Route: https://oceanoftales.vercel.app/api/v1/books?page=1&limit=10 (GET) ✅
- - Route: https://oceanoftales.vercel.app/api/v1/books?genre=Thriller,Fantasy,Crime (GET) ✅
- - Route: https://oceanoftales.vercel.app/api/v1/books?sortBy=publicationDate&sortOrder=desc (GET) ✅
- - Route: https://oceanoftales.vercel.app/api/v1/books?publicationDate=2013,2023 (GET) ✅
- Route: https://oceanoftales.vercel.app/api/v1/books (POST) ✅

### Review

- Route: https://oceanoftales.vercel.app/api/v1/reviews/:id (PATCH) ✅

### User Book List

- Route: https://oceanoftales.vercel.app/api/v1/user-book/get-wish/:email/:id (GET) ✅
- Route: https://oceanoftales.vercel.app/api/v1/user-book/get-read/:email/:id (GET) ✅
- Route: https://oceanoftales.vercel.app/api/v1/user-book/get-finish/:email/:id (GET) ✅
- Route: https://oceanoftales.vercel.app/api/v1/user-book/get-wish/:email (GET) ✅
- Route: https://oceanoftales.vercel.app/api/v1/user-book/get-read/:email (GET) ✅
- Route: https://oceanoftales.vercel.app/api/v1/user-book/get-finish/:email (GET) ✅
- Route: https://oceanoftales.vercel.app/api/v1/user-book/add-wish/:email (PATCH) ✅
- Route: https://oceanoftales.vercel.app/api/v1/user-book/add-read/:email (PATCH) ✅
- Route: https://oceanoftales.vercel.app/api/v1/user-book/add-finish/:email (PATCH) ✅
