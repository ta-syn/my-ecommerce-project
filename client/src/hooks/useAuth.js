import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

/**
 * একটি কাস্টম হুক যা AuthContext-এর ভ্যালু প্রদান করে।
 * এর ফলে প্রতিবার useContext এবং AuthContext ইম্পোর্ট করার প্রয়োজন হয় না।
 * @returns {{
 *   user: object | null,
 *   token: string | null,
 *   isAuthenticated: boolean,
 *   loading: boolean,
 *   login: (userData: object, authToken: string) => void,
 *   logout: () => void
 * }}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

// এই ফাইলে আর কিছু লাগবে না। `useAuth` একাই একটি সম্পূর্ণ মডিউল।