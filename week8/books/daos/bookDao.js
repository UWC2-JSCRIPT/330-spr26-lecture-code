import mongoose from 'mongoose';
import Book from '../models/book';

export const getAll = (page, perPage) =>
  Book.find()
    .limit(perPage)
    .skip(perPage * page)
    .lean();

export const getById = (bookId) => {
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return null;
  }
  return Book.findOne({ _id: bookId }).lean();
};

export const deleteById = async (bookId) => {
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return false;
  }
  await Book.deleteOne({ _id: bookId });
  return true;
};

export const updateById = async (bookId, newObj) => {
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return false;
  }
  await Book.updateOne({ _id: bookId }, newObj);
  return true;
};

export const create = async (bookData) => Book.create(bookData);
