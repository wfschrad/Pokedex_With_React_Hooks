import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { baseUrl } from './config';
import { PokemonContext } from './PokemonContext';

const LoginPanel = () => {
  const { login, authToken } = useContext(PokemonContext);
  // console.log(authToken) // console log authToken to test login flow
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/session`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      setLoggedIn(true);
      login(token);
    }
  }

  const updateEmail = e => setEmail(e.target.value);
  const updatePassword = e => setPassword(e.target.value);

  if (loggedIn) return <Redirect to="/" />;

  return (
    <main className="centered middled">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail} />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword} />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}

export default LoginPanel;
