 const unit = {
  units: ['box', 'cm', 'dz', 'ft', 'g', 'in', 'kg', 'lb', 'm', 'ml', 'pcs', 'qt', 'sz'],
  productSize: ['cm', 'in', 'ft', 'm'],
};

 const allUnit = Object.keys(unit);
 const unitRules = new Map(Object.entries(unit));

export default {
  allUnit,
  unitRules,
};
