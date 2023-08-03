import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { bookSearchableFields } from "./book.constant";
import { IBook, IBookFilters } from "./book.interface";
import { Book } from "./book.model";

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
        // if (field === "publicationDate") {
        //   const dateRange = value.split(",");
        //   const startDate = new Date(dateRange[0] + " 00:00:00");
        //   const endDate = new Date(dateRange[1] + " 23:59:59");

        //   // Set startDate to January 1st
        //   startDate.setMonth(0);
        //   startDate.setDate(1);

        //   // Set endDate to December 31st
        //   endDate.setMonth(11);
        //   endDate.setDate(31);

        //   return {
        //     publicationDate: { $gte: startDate, $lte: endDate },
        //   };
        // }
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

  // if (Object.keys(filtersData).length) {
  //   andConditions.push({
  //     $and: Object.entries(filtersData).map(([field, value]) => {
  //       if (field === "genre" && value.includes(",")) {
  //         return {
  //           [field]: { $in: value.split(",") },
  //         };
  //       } else {
  //         return {
  //           [field]: value,
  //         };
  //       }
  //     }),
  //   });
  // }

  console.log(andConditions);
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

export const BookService = {
  getAllBooks,
};
