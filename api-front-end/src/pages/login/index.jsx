import { useRef, useState, useEffect } from 'react';
import { login } from './login';
export const Login = () => {
  
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  
  const [loginSuccess, setLoginSuccess] = useState(undefined);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const userName = userNameRef.current.value;
    const password = passwordRef.current.value;
    const data = await login(userName, password);
    setLoginSuccess(data.status === 200);
    console.log(data);
  };
  
  useEffect(() => {
    if (loginSuccess !== undefined) {
      setTimeout(() => {
        setLoginSuccess(undefined)
      }, 3000)
    }
  }, [loginSuccess]);
  
  
  return (
    <section className="login">
      <div className="login-container">
        <h1>Login</h1>
        <form>
          <div className="input">
            <label htmlFor="userName">Username :</label>
            <input placeholder=" " type="userName" id="userName" name="userName" required ref={userNameRef} />
          </div>
          <div className="input">
            <label htmlFor="password">Password:</label>
            <input placeholder=" " type="password" id="password" name="password" required ref={passwordRef} />
          </div>
          <button style={{background: loginSuccess !== undefined ? loginSuccess ? 'aquamarine' : 'red' : 'white'}} type="submit" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </section>
  )
}