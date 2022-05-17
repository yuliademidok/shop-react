import { useState, useContext } from "react";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

import { UserContext } from '../../context/user.context'
import FormInput from '../form-input/form-input.component'
import Button from "../button/button.component";
import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    setCurrentUser(user);
    await createUserDocumentFromAuth(user);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
      
      resetFormFields();
    } catch (error) {
      if (error.code && ('auth/user-not-found', 'auth/wrong-password')) {
        alert('Either email or password are incorrent')
      }
      console.log(error);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email" required onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password" required onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit" buttonType='inverted'>Sign in</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType='google'>Google Sign in</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm