import request from 'supertest';

import server from '../server';
import * as testUtils from '../testUtils';
import Book from '../models/book';
import bookApi from '../api/booksApi';

jest.mock('../api/booksApi', () => ({
  getBookViews: jest.fn(async () => 42),
}));

describe('books routes', () => {
  beforeAll(async () => {
    await testUtils.connectDB();
  });

  afterAll(async () => {
    await testUtils.stopDB();
  })

  describe('POST /books', () => {
    it('should return a 409 when inserting a duplicate book', async () => {
      const testBook = {
        title: 'Project Hail Mary',
        author: 'Andy Weir',
        publicationYear: 2021,
        pageCount: 496,
      };

      // This should succeed, as the first book saved
      await request(server)
        .post('/books')
        .send(testBook)
        .expect(200);
      
      // Saving the same book again should fail
      await request(server)
        .post('/books')
        .send(testBook)
        .expect(409);
    });
  });

  describe('GET /books/:id/ISBN', () => {
    it('should return an ISBN for a book', async () => {
      // const bookViewsSpy = jest.spyOn(bookApi, 'getBookViews');
      // bookViewsSpy.mockResolvedValue(42);

      const testBook = {
        title: 'Accidentally on Purpose',
        author: 'Kristen Kish',
        publicationYear: 2025,
        pageCount: 352,
      };

      const newBookResponse = await request(server)
        .post('/books')
        .send(testBook)
        .expect(200);
      
      // eslint-disable-next-line no-underscore-dangle
      const bookId = newBookResponse.body._id;

      const viewResponse = await request(server)
        .get(`/books/${bookId}/third-party-views`)
        .expect(200);
      
      expect(viewResponse.body.views).toEqual(42);
      // expect(bookViewsSpy).toHaveBeenCalledTimes(1);
      // expect(bookViewsSpy).toHaveBeenCalledWith('Accidentally on Purpose', 'Kristen Kish');
      expect(bookApi.getBookViews).toHaveBeenCalledTimes(1);
      expect(bookApi.getBookViews).toHaveBeenCalledWith('Accidentally on Purpose', 'Kristen Kish');
    });
  });
});
