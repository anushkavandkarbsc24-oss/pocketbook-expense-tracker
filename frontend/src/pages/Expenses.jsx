import TransactionsPage from './TransactionsPage';
import { EXPENSE_CATEGORIES } from '../utils/constants';

function Expenses() {
  return (
    <TransactionsPage
      type="expense"
      title="Expenses"
      subtitle="Record money going out so you can see where it went."
      categories={EXPENSE_CATEGORIES}
    />
  );
}

export default Expenses;
