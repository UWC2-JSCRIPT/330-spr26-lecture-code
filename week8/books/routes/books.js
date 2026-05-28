import { Router } from 'express';
import { string, number, object } from 'yup';

import * as bookDAO from '../daos/bookDao';
import bookAPI from '../api/booksApi';

const router = Router();

const bookSchema = object({
  title: string().required(),
  author: string().required(),
  genre: string().optional(),
  blurb: string().optional(),
  publicationYear: number().integer().required(),
  pageCount: number().integer().required().min(1),
});

// Create
router.post('/', async (req, res) => {
  const book = req.body;
  try {
    await bookSchema.validate(book, { abortEarly: false });
  } catch (err) {
    return res.status(400).json(err.errors);
  }

  try {
    const savedBook = await bookDAO.create(book);
    return res.json(savedBook);
  } catch (e) {
    if (e.message.includes('duplicate')) {
      return res.sendStatus(409);
    }
    return res.status(500).send(e.message);
  }
});

// Read - single book
router.get('/:id', async (req, res) => {
  try {
    const book = await bookDAO.getById(req.params.id);
    if (book) {
      return res.json(book);
    }
    return res.sendStatus(404);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// Read - all books
router.get('/', async (req, res) => {
  try {
    let { page, perPage } = req.query;
    page = page ? Number(page) : 0;
    perPage = perPage ? Number(perPage) : 10;
    const books = await bookDAO.getAll(page, perPage);
    return res.json(books);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// Update
router.put('/:id', async (req, res) => {
  const bookId = req.params.id;
  const book = req.body;
  try {
    await bookSchema.validate(book, { abortEarly: false });
  } catch (err) {
    return res.status(400).json(err.errors);
  }
  try {
    const success = await bookDAO.updateById(bookId, book);
    return res.sendStatus(success ? 200 : 400);
  } catch (e) {
    if (e instanceof bookDAO.BadDataError) {
      return res.status(400).send(e.message);
    }
    return res.status(500).send(e.message);
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const success = await bookDAO.deleteById(bookId);
    res.sendStatus(success ? 200 : 400);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// GET external book views
router.get('/:id/third-party-views', async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await bookDAO.getById(bookId);
    if (!book) {
      return res.sendStatus(404);
    }
    const views = await bookAPI.getBookViews(book.title, book.author);
    return res.json({ views });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

export default router;
