import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/signup', {
        username,
        email,
        password,
      });
      alert(res.data.msg);
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        <p>Alreay have an account <a href="/login">Login</a></p>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './SignUp.css';

// const SignUp = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSendOtp = async () => {
//     try {
//       await axios.post('http://localhost:5000/send-otp', { phone });
//       setOtpSent(true);
//       alert('OTP sent via WhatsApp!');
//     } catch (err) {
//       setError(err.response?.data?.msg || 'Failed to send OTP');
//     }
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       await axios.post('http://localhost:5000/verify-otp', { phone, otp });
//       setOtpVerified(true);
//       alert('Phone number verified successfully!');
//     } catch (err) {
//       setError(err.response?.data?.msg || 'Invalid OTP');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!otpVerified) {
//       setError('Please verify your phone number before signing up.');
//       return;
//     }
//     try {
//       const res = await axios.post('http://localhost:5000/auth/signup', {
//         username,
//         email,
//         password,
//         phone,
//       });
//       alert(res.data.msg);
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.msg || 'Something went wrong');
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="WhatsApp Number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         {!otpSent && (
//           <button type="button" onClick={handleSendOtp}>
//             Send OTP via WhatsApp
//           </button>
//         )}
//         {otpSent && (
//           <div>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//             <button type="button" onClick={handleVerifyOtp}>
//               Verify OTP
//             </button>
//           </div>
//         )}
//         <button type="submit" disabled={!otpVerified}>
//           Sign Up
//         </button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default SignUp;
