import { IBookFilters } from "./book.interface";

export const bookFilterableFields: (keyof IBookFilters)[] = [
  "searchTerm",
  "genre",
  "publicationDate",
  "author.email",
];

export const bookSearchableFields = ["title", "author.name", "genre"];
