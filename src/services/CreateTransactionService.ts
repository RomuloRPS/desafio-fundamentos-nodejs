import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction, { TypeEnum } from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: TypeEnum;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    if (type !== TypeEnum.income || type !== TypeEnum.income) {
      throw Error('The type should be income or outcome');
    }

    if (this.hasValidBalance(value, type)) {
      throw Error('The type should be income or outcome');
    }

    return transaction;
  }

  private hasValidBalance(value: number, type: TypeEnum): boolean {
    return (
      this.transactionsRepository.getBalance().total > value &&
      type === TypeEnum.outcome
    );
  }
}

export default CreateTransactionService;
