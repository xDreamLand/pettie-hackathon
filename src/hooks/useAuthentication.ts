import { useState, useEffect } from 'react';

import { auth, onAuthStateChanged, User } from '../firebase';

export function useAuthentication() {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Signed in - https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // Not siged in
        setUser({} as User);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user,
  };
}
