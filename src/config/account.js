export const account = {
  accountName: ['discount', 'general income', 'interest income', 'late fee', 'other charges', 'sales', 'delivery charges'],
};

export const purchaseAccount = {
  purchaseAcc: [
    'Automobile Expenses',
    'Bank fees',
    'bank dept',
    'advertising and marketing',
    'consultant charges',
    'credit card expenses',
    'depreciation expenses',
    'IT & and expenses',
    'lodging & Entertainment',
    'office supplies',
    'other expenses',
    'purchase discounts',
    'telephone expenses',
  ],
};

export const allAccount = Object.keys(account);
export const purchaseAcc = Object.keys(purchaseAccount);
export const accountItems = new Map(Object.entries(account));
export const purchaseItems = new Map(Object.entries(purchaseAcc));

export default accountData;