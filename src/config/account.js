 const account = {
  accountName: ['discount', 'general income', 'interest income', 'late fee', 'other charges', 'sales', 'delivery charges'],
};

 const purchaseAccount = {
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

 const allAccount = Object.keys(account);
 const purchaseAcc = Object.keys(purchaseAccount);
 const accountItems = new Map(Object.entries(account));
 const purchaseItems = new Map(Object.entries(purchaseAcc));

 export default {
  allAccount,
  purchaseAcc,
  accountItems,
  purchaseItems,
};
