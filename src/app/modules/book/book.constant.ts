import { IBookFilters } from "./book.interface";

export const bookFilterableFields: (keyof IBookFilters)[] = [
  "searchTerm",
  "genre",
  "publicationDate",
];

export const bookSearchableFields = ["title", "author.name", "genre"];
