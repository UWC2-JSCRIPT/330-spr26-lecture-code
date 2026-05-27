import request from 'supertest';

import server from '../server';
import * as testUtils from '../testUtils';
import Book from '../models/book';
import booksApi from '../api/booksApi';

describe('books routes', () => {
  describe('POST /books', () => {
    it('should return a 409 when inserting a duplicate book', async () => {
      expect(true).toEqual(false);
    });
  });

  describe('GET /books/:id/ISBN', () => {
    it('should return an ISBN for a book', async () => {
      expect(true).toEqual(false);
    });
  });
});
