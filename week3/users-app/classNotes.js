//warm up
import mongoose from 'mongoose';
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, require: true },
  categories: [String]
});
export default mongoose.model("items", itemSchema);

//Write queries to find:
// ● The top 10 most expensive items, ranked by price
db.items.find().sort({ price: 'desc', test: -1 }).limit(10)

// ● All items with a category of “food”
db.items.find({ categories: 'food' })

// ● Every item with at least 2 categories
db.items.find({ 'categories.1': {$exists: true}})
// ● Items whose name starts with “large”
db.items.find({name: /^large/}) //regex

//find all this shit in mongoose documentation


//Aggregation [basic find-esque]
db.books.aggregate([ { $match: { genre: 'Fantasy' } }] )

//same as
db.books.find({ genre: 'Fantasy' })

// Aggregation
db.books.aggregate([
  { $match: { genre: "Fantasy" } },
  { $group: { _id: '$publisher', titles: { $addToSet: '$title' } } }
]);

// Aggregation (group by, another accumulator object)
db.books.aggregate([
  { $match: { genre: "Fantasy" } },
  { $group: { _id: '$publisher', titles: { $addToSet: '$title' }, averageRating: { $avg: '$rating'} } }
]);

// projection example
db.books.aggregate([
  { $match: { genre: "Fantasy" } },
  { $group: { _id: '$publisher', titles: { $addToSet: '$title' }, averageRating: { $avg: '$rating'} } },
  { $project: { _id: 0 } }
]);

// projection example with a rename + show a couple attributes
db.books.aggregate([
  { $match: { genre: "Fantasy" } },
  { $group: { _id: '$publisher', titles: { $addToSet: '$title' }, averageRating: { $avg: '$rating'} } },
  { $project: { _id: 0, publisher: '$_id', titles: 1, averageRating: 1 } }
]);

// Filter based on average book rating for Fantasy titles by publisher
db.books.aggregate([
  { $match: { genre: "Fantasy" } },
  { $group: { _id: '$publisher', titles: { $addToSet: '$title' }, averageRating: { $avg: '$rating'} } },
  { $project: { _id: 0, publisher: '$_id', titles: 1, averageRating: 1 } },
  { $match: { averageRating: { $gt: 4 } } }
]);

// Unwind based on book titles
db.books.aggregate([
  { $match: { genre: "Fantasy" } },
  { $group: { _id: '$publisher', titles: { $addToSet: '$title' }, averageRating: { $avg: '$rating'} } },
  { $project: { _id: 0, publisher: '$_id', titles: 1, averageRating: 1 } },
  { $match: { averageRating: { $gt: 4 } } },
  { $unwind: '$titles' },
  { $project: { titles: '$titles', averageRating: 1, publisher: 1 } }
]);

// Lookup author -> books
db.authors.aggregate([{
  $lookup: {
    from: 'books',
    localField: 'booksArray',
    foreignField: '_id',
    as: 'books',

  }
}, {
  $project: { name: 1, authoredBooks: 1, _id: 0 }

}, { $limit: 5 }
])