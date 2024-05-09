import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import Login from '../../components/container/ModalPopup/Login';
import Signup from '../../components/container/ModalPopup/Signup';






const Appbar = () => {
    const theme = useTheme(); 
    const activeStyle = {
        color: theme.palette.primary.main,
    };

    const [openLoginModal, setOpenLoginModal] = useState(false)
    const [openSignupModal, setOpenSignupModal] = useState(false)

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const nav = useNavigate();

    const handleNavigate = (path) => () => {
        nav(path);
    };
  
    const handleAuthButtonClick = () => {
      setIsLoggedIn(!isLoggedIn);
    };

    const handleLoginModal =()=>{
      setOpenLoginModal(true)

    }

    const handleSignupModal =()=>{
      setOpenSignupModal(true)

    }
    const closeModal=()=>{
      setOpenLoginModal(false)
    }
    const closeSignupModal=()=>{
      setOpenSignupModal(false)
    }


    const [tasks, setTasks] = useState([]);

    const saveTasks = (taskObject) =>{

      const newSavedTasks = [...tasks, taskObject];
      setTasks(newSavedTasks);
    }
  
    const deleteTask = (idx) =>{
      const remainingTasks = tasks.filter(taskItem=>tasks.indexOf(taskItem)!=idx);
      setTasks(remainingTasks);
    }
  
    const editTask = (editedTask, idx) =>{
      let tempTask = [...tasks];
      tempTask[idx] = editedTask;
      setTasks(tempTask);
    } 

    return (
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, backgroundColor: theme.palette.primary.light, }}>
        <Toolbar sx={{
            marginLeft: 25,
            marginRight: 25,
            marginTop: 1.5,
            marginBottom: 1.5,
        }}>
          <img src="/Logo.png" alt="logo" style={{ marginRight: 10, height: 50 }} />
          <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: theme.palette.primary.main, marginLeft: 1 }}>
            Jobgenie
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Button color="inherit" component={NavLink} to="/home"
            sx={{ 
                color: theme.palette.primary.grey, 
                fontWeight: 'bold', 
                marginRight: 2, 
                '&.active': activeStyle,
                '&:hover': { 
                    color: theme.palette.primary.main ,
                }
            }}>
                Home
            </Button>
            <Button color="inherit" component={NavLink} to="/jobs"
            sx={{ 
                color: theme.palette.primary.grey, 
                fontWeight: 'bold', 
                marginRight: 2, 
                '&.active': activeStyle,
                '&:hover': { 
                    color: theme.palette.primary.main ,
                }
            }}>
                Jobs
            </Button>
            <Button color="inherit" component={NavLink} to="/templates"
            sx={{ 
                color: theme.palette.primary.grey, 
                fontWeight: 'bold', 
                marginRight: 2, 
                '&.active': activeStyle,
                '&:hover': { 
                    color: theme.palette.primary.main ,
                }
            }}>
                Templates
            </Button>
            
            <GradientButton onClick={handleNavigate('/cv-builder')}>
                CV Builder
            </GradientButton>

          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            <Button variant="contained" color="primary" onClick={handleLoginModal}
            sx={{ marginRight: 1 }} >
              Login
            </Button>
            
            <Button variant="outlined" color="primary" onClick={handleSignupModal}>
              Sign Up
            </Button>
           
           
          </Box>
        </Toolbar>
        <Login openLoginModal={openLoginModal} closeModal={closeModal} saveTasks={saveTasks} ></Login>
        <Signup openSignupModal={openSignupModal} closeSignupModal={closeSignupModal} saveTasks={saveTasks}></Signup>
      </AppBar>

      
    );
  };


// Styled button component
const GradientButton = styled.button`
  background: linear-gradient(to right, #41B4E5 20%, #513DCE 60%);
  color: white;
  font-weight: bold;
  border-radius: 26px;
  border: 2px solid white;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 0.9rem;
  text-transform: uppercase;
  transition: all 0.5s ease;
  background-size: 200%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25); // Drop shadow added

  &:hover {
    background-position: right;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.35); // Enhanced shadow on hover for a dynamic effect
  }
`;

  
  export default Appbar;
  