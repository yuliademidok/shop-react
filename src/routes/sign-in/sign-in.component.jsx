import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'


const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <button onClick={logGoogleUser}>
        Sign in with Google popup
      </button>
    </div>
  )
}

export default SignIn