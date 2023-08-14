import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { bookSearchableFields } from "./book.constant";
import { IBook, IBookFilters } from "./book.interface";
import { Book } from "./book.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        if (field === "publicationDate") {
          const [from, to] = value.split(",").map(Number);
          if (!isNaN(from) && !isNaN(to)) {
            const fromYear = Math.min(from, to);
            const toYear = Math.max(from, to);
            const fromDate = new Date(fromYear, 0, 1);
            const toDate = new Date(toYear, 11, 31);
            return {
              [field]: {
                $gte: fromDate,
                $lte: toDate,
              },
            };
          } else if (!isNaN(from)) {
            const toDate = new Date(from, 11, 31);
            return {
              [field]: {
                $lte: toDate,
              },
            };
          } else if (!isNaN(to)) {
            const fromDate = new Date(to, 0, 1);
            return {
              [field]: {
                $gte: fromDate,
              },
            };
          }
        }
        if (field === "genre" && value.includes(",")) {
          return {
            [field]: { $in: value.split(",") },
          };
        } else {
          return {
            [field]: value,
          };
        }
      }),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findOne({ _id: id }).orFail(
    new ApiError(httpStatus.NOT_FOUND, "Book Not Found")
  );
  return result;
};

const createBook = async (payload: IBook): Promise<IBook> => {
  const book = await Book.create(payload);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Failed to publish book");
  }
  return book;
};

const updateBook = async (id: string, payload: IBook): Promise<IBook> => {
  await Book.exists({ _id: id }).orFail(
    new ApiError(httpStatus.NOT_FOUND, "Book Not Found")
  );

  const result = await Book.findByIdAndUpdate(id, payload, {
    new: true,
  }).orFail(new ApiError(httpStatus.NOT_FOUND, "Failed to update book"));

  return result;
};

const deleteBook = async (id: string): Promise<IBook> => {
  await Book.exists({ _id: id }).orFail(
    new ApiError(httpStatus.NOT_FOUND, "Book Not Found")
  );

  const result = await Book.findByIdAndDelete(id).orFail(
    new ApiError(httpStatus.NOT_FOUND, "Failed to delete book")
  );

  return result;
};

export const BookService = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
