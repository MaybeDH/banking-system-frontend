// Este se usa para enviar transferencias al backend
export interface TransactionRequest {
  sourceAccountId: number;
  targetAccountId?: number; // puede ser null si es retiro o depósito
  transactionType: 'Retiro' | 'Depósito' | 'Transferencia';
  amount: number;
}
