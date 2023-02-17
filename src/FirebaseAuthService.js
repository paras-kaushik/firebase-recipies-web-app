import firebase from "./FirebaseConfig";

const auth = firebase.auth();

const registerUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

const loginUser = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

const logoutUser = () => {
  return auth.signOut();
};

const sendPasswordResetEmail = (email) => {
  return auth.sendPasswordResetEmail(email);
};

const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return auth.signInWithPopup(provider);
};

const subscribeToAuthChanges = (handleAuthChange) => {
  auth.onAuthStateChanged((user) => {

    if(user){
      user.getIdTokenResult().then(idTokenResult=>{
        console.log(idTokenResult.claims.admin);
        user.admin =idTokenResult.claims.admin;
      })
    }
    handleAuthChange(user);
  });
};

const FirebaseAuthService = {
  loginUser,
  logoutUser,
  registerUser,
  sendPasswordResetEmail,
  loginWithGoogle,
  subscribeToAuthChanges,
};

export default FirebaseAuthService;
