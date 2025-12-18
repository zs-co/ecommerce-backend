export const validateRegister = (data: any) => {
  const errors: Record<string, string> = {};
  if (!data.email) errors.email = 'Email is required';
  if (!data.password) errors.password = 'Password is required';
  if (!data.first_name) errors.first_name = 'First name is required';
  if (!data.last_name) errors.last_name = 'Last name is required';
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateLogin = (data: any) => {
  const errors: Record<string, string> = {};
  if (!data.email) errors.email = 'Email is required';
  if (!data.password) errors.password = 'Password is required';
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
