import { useEffect, useState } from "react";
import initializeFirebase from "../Pages/Auth/Firebase/firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile,
  getIdToken,
} from "firebase/auth";

//initialize firebase app
initializeFirebase();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [successText, setSuccessText] = useState("");
  const [admin, setAdmin] = useState("");

  const auth = getAuth();

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        getIdToken(user).then((idToken, admin) =>
          localStorage.setItem("idToken", idToken)
        );
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => {
      unsubscribed();
    };
  }, [auth]);

  const registerUser = (email, password, name) => {
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        saveUser(email, name, "POST");
        console.log(email, name);
        updateProfile(auth.user, {
          displayName: name,
        });
        const user = userCredential.user;
        setUser(user);
        
        setSuccessText("User created successfully");
        setAuthError("");
      })
      .catch((error) => {
        const errorMessage = error.code;
        setAuthError(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  const loginUser = (email, password, location, navigate) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setAuthError("");
        let from = location.state?.from?.pathname || "/";
        navigate(from);
      })
      .catch((error) => {
        const errorMessage = error.code;
        setAuthError(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  const googleLogin = (location, navigate) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        saveUser(user.email, user.displayName, "PUT");
        setAuthError("");
        let from = location.state?.from?.pathname || "/";
        navigate(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setAuthError(errorMessage);
      });
  };

  const setUserName = (name) => {
    updateProfile(auth.user, {
      displayName: name,
    })
      .then(() => {
        console.log("User name updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => setIsLoading(false));
  };

  const saveUser = (email, displayName, method) => {
    const user = { email, displayName };
    const url = "https://tranquil-bastion-41948.herokuapp.com/addUser";
    fetch(url, {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  useEffect(() => {
    const url = `https://tranquil-bastion-41948.herokuapp.com/users/${user.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);

  useEffect(() => {
    setTimeout(() => {
      setSuccessText("");
      setAuthError("");
    }, 5000);
  });

  return {
    user,
    admin,
    registerUser,
    loginUser,
    googleLogin,
    setUserName,
    logOut,
    authError,
    successText,
    isLoading,
  };
};

export default useFirebase;
