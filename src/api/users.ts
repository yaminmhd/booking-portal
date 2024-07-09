import { User } from './data/users';
import { getStorageValue } from './helpers';

type UserInput = {
  email: string;
  password: string;
};

export const getUser = ({ email, password }: UserInput) => {
  const users: User[] = getStorageValue('users');
  if (!users) {
    console.log('No users table found');
    return;
  }

  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  return user;
};
