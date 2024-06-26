import { Label } from "flowbite-react";
import { useState } from "react";
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Modal, Box } from "@mui/material";
import { useAuthContext } from '../../../context/authContext';
import { toast } from "react-toastify";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto', // Adjusted for wider content
  minwidth: '250px', // Adjusted for wider content
  maxWidth: '50%', // Ensures modal doesn't become too large
  overflowX: 'auto', // Allows horizontal scrolling
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
  maxHeight: '90vh',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '5px',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.0)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.0)',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'darkgrey',
    outline: '1px solid slategrey',
    borderRadius: '30px',
  },
};

const Signup = ({ openSignupModal, closeSignupModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const { register, username } = useAuthContext();

  const handleSave = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const name = e.target.elements.name.value;
  
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    try {
      await register(name, email, password);
      setPassword('');
      setConfirmPassword('');
      setError(null);
      closeSignupModal();
      toast.success(`Welcome!`);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };
  

  const handleClose = () => {
    setPassword('');
    setConfirmPassword('');
    setError(null);
    closeSignupModal();
  }

  return (
    <Modal open={openSignupModal} onClose={handleClose}>
      <Box sx={style}>
        <div className="flex justify-center items-center h-[600px] flex-col border bg-white">
          <form className="flex justify-center px-12 pt-20 w-full bg-white" onSubmit={handleSave}>
            <div className="flex flex-col gap-4 items-start w-full px-24">
              <div className="text-black font-black text-3xl">Sign Up</div>
              <div className="text-lg">Already have an account yet? <span><a href="#" className="underline text-[#13287E] font-bold">Log in</a></span></div>
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-lg font-semibold">User Name</Label>
                <input type='text' className="rounded-xl w-full shadow-xl" placeholder="Enter your name" required name="name"></input>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-lg font-semibold">Email Address</Label>
                <input type='email' className="rounded-xl w-full shadow-xl" placeholder="you@example.com" required name="email"></input>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between"><Label className="text-lg font-semibold">Password</Label></div>
                <input type={showPassword ? "text" : "password"} className="rounded-xl w-full shadow-xl" placeholder="Enter 6 characters or more" required name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <div className="flex justify-end" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between"><Label className="text-lg font-semibold">Confirm Password</Label></div>
                <input type={showPassword ? "text" : "password"} className="rounded-xl w-full shadow-xl" placeholder="Enter 6 characters or more" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                <div className="flex justify-end" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</div>
              </div>

              {error && <div className="text-red-500">{error}</div>}

              <div className="w-full flex justify-center pb-12">
                <button className="btn bg-gradient-to-r from-[#41b4e6] to-[#5262d5] hover:bg-[#513dce] hover:border-2 hover:border-white border-2 border-white text-white font-bold px-4 py-2 rounded-2xl text-lg shadow-xl w-[150px]" type="submit">
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
}

Signup.propTypes = {
  openSignupModal: PropTypes.bool,
  closeSignupModal: PropTypes.func,
};

export default Signup;
