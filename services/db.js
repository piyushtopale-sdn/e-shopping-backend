/**
 * Builds sorting
 * @param {string} sort - field to sort from
 * @param {number} order - order for query (1,-1)
 */
 const buildSort = (sort, order) => {
    const sortBy = {};
    sortBy[sort] = order;
    return sortBy;
  };
  
  /**
 * Builds initial options for query
 * @param {Object} query - query object
 */
 const listInitOptions = async (req) => {
    return new Promise((resolve) => {
      const order = req.query.order || -1;
      const sort = req.query.sort || "createdAt";
      const sortBy = buildSort(sort, order);
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const options = {
        sort: sortBy,
        lean: true,
        page,
        limit
      };
      if (req.populate) options.populate = req.populate;
      resolve(options);
    });
  };

  /**
 * Hack for mongoose-paginate, removes 'id' from results
 * @param {Object} result - result object
 */
const cleanPaginationID = (result) => {
    result?.docs?.map((element) => delete element.id);
    return result;
  };

  module.exports = {

   /**
   * Gets items from database
   * @param {Object} req - request object
   * @param {Object} query - query object
   */
    async getItems(req, model, query = {}) {
        const options = await listInitOptions(req);
        return new Promise((resolve, reject) => {
          model.paginate(query, options, (err, items) => {
            if (err) {
              reject(buildErrObject(422, err.message));
            }
            resolve(cleanPaginationID(items));
          });
        });
      }

    }