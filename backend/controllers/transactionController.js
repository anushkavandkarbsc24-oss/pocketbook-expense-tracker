// Income and expenses behave the same way, so one factory builds the
// controller functions (getAll, add, remove) for either model.
const createTransactionController = (Model, categories, label) => {
  // Validates the request body and returns an error message (or null)
  const validate = ({ title, amount, category, date }) => {
    if (!title || !title.trim()) return 'Title is required';
    if (title.trim().length > 60) return 'Title must be 60 characters or fewer';
    if (amount === undefined || amount === '' || Number.isNaN(Number(amount)) || Number(amount) <= 0) {
      return 'Amount must be a number greater than 0';
    }
    if (!categories.includes(category)) return 'Please choose a valid category';
    if (date && Number.isNaN(new Date(date).getTime())) return 'Date is not valid';
    return null;
  };

  // GET - all items of the logged-in user, newest first
  const getAll = async (req, res, next) => {
    try {
      const items = await Model.find({ user: req.user._id }).sort({ date: -1, createdAt: -1 });
      res.json(items);
    } catch (error) {
      next(error);
    }
  };

  // POST - create an item
  const add = async (req, res, next) => {
    try {
      const problem = validate(req.body);
      if (problem) return res.status(400).json({ message: problem });

      const { title, amount, category, date } = req.body;
      const item = await Model.create({
        user: req.user._id,
        title,
        amount: Number(amount),
        category,
        date: date || Date.now(),
      });
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  };

  // DELETE - remove one item (only if it belongs to the logged-in user)
  const remove = async (req, res, next) => {
    try {
      const item = await Model.findOneAndDelete({ _id: req.params.id, user: req.user._id });
      if (!item) return res.status(404).json({ message: `${label} not found` });
      res.json({ message: `${label} deleted`, id: item._id });
    } catch (error) {
      next(error);
    }
  };

  return { getAll, add, remove };
};

module.exports = createTransactionController;
