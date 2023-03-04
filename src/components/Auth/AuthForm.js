import React, { useState } from "react";
import {
  Dialog,
  FormLabel,
  TextField,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const labelStyle = {
  mt: 1,
  mb: 1,
};
const AuthForm = ({onSubmit, isAdmin}) => {

    const [isSignup, setIsSignup] = useState(false)
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({inputs, signup: isAdmin ? false : isSignup})
    }

  return (
    <Dialog open={true} PaperProps={{ style: {borderRadius: 20} }}>
        <Box sx={{ ml: 'auto', padding: 1 }}>
            <IconButton>
                <CloseIcon />
            </IconButton>
        </Box>
      <Typography variant="h4" textAlign={"center"} paddingTop={3}>
        { !isSignup ? 'Login' : 'Signup' }
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          width={400}
          margin={"auto"}
          alignContent={"center"}
          padding={3}
        >
            {
                !isAdmin && isSignup && 
                <>
                    <FormLabel sx={labelStyle}>Name</FormLabel>
                    <TextField
                        value={inputs.name}
                        onChange={handleChange}
                        variant="standard"
                        type={"name"}
                        name={"name"}
                    />
                </>
            }
          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            variant="standard"
            type={"email"}
            name={"email"}
          />
          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            variant="standard"
            type={"password"}
            name={"password"}
          />
          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              borderRadius: 10,
              bgcolor: "#2d2b42",
              color: "#fff",
              border: '2px solid #2d2b42',
              fontWeight: 500,
              ":hover": { color: "#000", border: '2px solid #2d2b42' },
            }}
          >
            { isSignup ? 'Signup' : 'Login' }
          </Button>
          {
            !isAdmin &&
          <Button
            fullWidth
            sx={{
              mt: 2,
              borderRadius: 10,
              bgcolor: "#2d2b42",
              color: "#fff",
              border: '2px solid #2d2b42',
              fontWeight: 500,
              ":hover": { color: "#000", border: '2px solid #2d2b42' },
            }}
            onClick={() => setIsSignup(!isSignup)}
          >
            Switch To {isSignup ? 'Login' : 'Signup'}
          </Button>
          }
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
