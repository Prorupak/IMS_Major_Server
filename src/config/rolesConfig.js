let allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
};

 export const role = Object.keys(allRoles);
 export const roleRights = new Map(Object.entries(allRoles));

// export default {
//   role,
//   roleRights,
// };
