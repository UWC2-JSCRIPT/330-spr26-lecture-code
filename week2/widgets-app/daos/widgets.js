import Widgets from '../models/widgets';

export const create = async (widget) => Widgets.insertOne(widget);
  // TODO: create widget document in the DB;

export const getById = async (id) => Widgets.findById(id)
  // TODO: look up widget in the DB and return it

export const getAll = async () => Widgets.find();

  // TODO: add method to update widget
export const update = async (id, widget) => Widgets.updateOne({
  _id: id, 
}, widget);

// export const updateAndReplace = async (id, widget) => {
//   const retreivedWidget = await Widgets.findById(id);
//   retreivedWidget.save();
// } 

export const deleteById = async (id) => Widgets.deleteOne({_id: id});
// TODO: add method to remove widget
