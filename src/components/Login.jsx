import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userInfo, setUserInfo] = useState({ email:'', password: ''});
  const [failureMessage, setFailureMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await fetch
        ('https://mawingu.cbaloop.com/cba/api/v1/access/login',
          { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo)
          }
        );

        if (response.ok) {
          navigate('/home');
        //   const data = await response.json();
        //   const token = data.token;

        //   localStorage.setItem('user-token', token);
        }
      }

    catch(error) {
      setFailureMessage(error.message);
    }

    finally {
      setUserInfo({email:'', password:''});
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    })
  }

  return (
    <>
      {failureMessage && <p>{failureMessage}</p>}
      <form onSubmit={(event)=> handleSubmit(event)}>
        <div>
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} required/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} required/>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
