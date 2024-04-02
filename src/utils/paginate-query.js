// Pagination helper
export const getPagination = async (Model, options) => {
 const page = options.page || 1;
 const limit = options.limit || 20;

 const query = Model.find(options.where)
  .select(options.select)
  .sort(options.sort)
  .populate(options.populate)
  .limit(limit)
  .skip((page - 1) * limit)
  .exec();

 const docs = await query;

 const totalDocs = await Model.countDocuments(options.where);

 const totalPages = Math.ceil(totalDocs / limit);

 return {
  results: docs,
  page,
  limit,
  totalPages,
  totalDocs,
 };
};
