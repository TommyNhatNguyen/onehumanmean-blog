export const VALIATION = {
  required: {
    message: "Please fill in this field",
  },
  email: {
    message: "Wrong email format",
    validateRe: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
};
