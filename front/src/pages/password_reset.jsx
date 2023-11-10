import React, { useState } from 'react';
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setResetSuccess(true);
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5">Reset Password</Typography>
      {resetSuccess ? (
        <p>Password reset email sent. Check your inbox.</p>
      ) : (
        <form onSubmit={handleResetPassword}>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Reset Password</Button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
