import { useContext } from 'react';
import { AuthContext } from '../contexts/context';

export function useAuth() {
  return useContext(AuthContext);
}
