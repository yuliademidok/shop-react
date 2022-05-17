import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Password does not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('This email already is use');
      } else {
        console.log('error when saving user', error.message)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Disaplay name</label>
        <input type="text" required onChange={handleChange} name="displayName" value={displayName} />

        <label>Email</label>
        <input type="email" required onChange={handleChange} name="email" value={email} />

        <label>Password</label>
        <input type="password" required onChange={handleChange} name="password" value={password} />

        <label>Comfirm Password</label>
        <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

        <button type="submit">Sign up</button>
      </form>
    </div>
  )
}

export default SignUpForm