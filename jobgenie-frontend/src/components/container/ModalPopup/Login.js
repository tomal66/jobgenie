import { Label, Toast } from "flowbite-react";
import { useState } from "react";
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Modal, Box } from "@mui/material";
import { useAuthContext } from "../../../context/authContext";
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    minwidth: '250px',
    maxWidth: '50%',
    overflowX: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    maxHeight: '80vh',
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

const Login = ({ openLoginModal, closeModal }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { login, username } = useAuthContext();
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        // console.log(username, password);

        try {
            await login(username, password);
            closeModal();
            toast.success(`Welcome back, ${username}!`);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.detail);
            } else {
                setError("An error occurred. Please try again later.");
            }
        }
    }

    return (
        <Modal open={openLoginModal} onClose={closeModal}>
            <Box sx={style}>
                <div className="flex justify-center items-center flex-col bg-white">
                    <form className="flex justify-center px-12 pt-12 w-full" onSubmit={handleLogin}>
                        <div className="flex flex-col gap-4 items-start w-full px-24">
                            <div className="text-black font-black text-3xl">Log In</div>
                            <div className="text-lg">Don’t have an account yet? <span><a href="#" className="underline text-[#13287E] font-bold">Sign Up</a></span></div>
                            <div className="flex flex-col gap-2 w-full">
                                <Label className="text-lg font-semibold">Username</Label>
                                <input type='text' className="rounded-xl w-full shadow-xl" placeholder="john99" required name="username"></input>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex justify-between">
                                    <Label className="text-lg font-semibold">Password</Label>
                                    <a href='#' className="text-lg font-medium underline font-bold text-[#13287E]">Forgot password?</a>
                                </div>
                                <input type={showPassword ? "text" : "password"} className="rounded-xl w-full shadow-xl" placeholder="Enter 6 character or more" required name="password"></input>
                                <div className="flex justify-end" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</div>
                            </div>
                            <div className="flex flex-row gap-2 w-full items-center">
                                <input type="checkbox" className="checkbox" />
                                <Label className="text-lg font-semibold text-[#6C6464]">Remember Password</Label>
                            </div>
                            {error && <div className="text-red-500">{error}</div>}
                            <div className="w-full flex justify-center">
                                <button className="btn bg-gradient-to-r from-[#41b4e6] to-[#5262d5] hover:bg-[#513dce] border-2 border-white text-white font-bold px-4 py-2 rounded-2xl text-lg shadow-xl w-[150px]" type="submit">
                                    Log In
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="flex w-full px-12 items-center justify-around py-6">
                        <div className="h-[1px] bg-slate-600 w-1/3" />
                        <p className="w-fit">or Login with</p>
                        <div className="h-[1px] w-1/3 bg-slate-600" />
                    </div>
                    <div className="flex items-center pb-12 justify-around w-full px-12">
                        <button className="border border-[#DB5E03] hover:bg-[#DB5E03] text-[#DB5E03] hover:text-white font-bold px-4 py-2 rounded-2xl text-lg shadow-xl w-[150px]">
                            Google
                        </button>
                        <button className="border border-[#1A5FB4] hover:bg-[#1A5FB4] text-[#1A5FB4] hover:text-white font-bold px-4 py-2 rounded-2xl text-lg shadow-xl w-[150px]">
                            Facebook
                        </button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}

Login.propTypes = {
    openLoginModal: PropTypes.bool,
    closeModal: PropTypes.func,
};

export default Login;
