export const unit = {
  units: ['box', 'cm', 'dz', 'ft', 'g', 'in', 'kg', 'lb', 'm', 'ml', 'pcs', 'qt', 'sz'],
  productSize: ['cm', 'in', 'ft', 'm'],
};

export const allUnit = Object.keys(unit);
export const unitRules = new Map(Object.entries(unit));

export default unit;
