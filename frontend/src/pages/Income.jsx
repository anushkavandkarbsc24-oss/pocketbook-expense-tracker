import TransactionsPage from './TransactionsPage';
import { INCOME_CATEGORIES } from '../utils/constants';

function Income() {
  return (
    <TransactionsPage
      type="income"
      title="Income"
      subtitle="Record money coming in: pocket money, stipends, freelance work."
      categories={INCOME_CATEGORIES}
    />
  );
}

export default Income;
