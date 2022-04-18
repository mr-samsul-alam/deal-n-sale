import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router';
import UseFireBase from '../../../Hooks/UseFireBase';
import { Avatar, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';






const pages = ['Home', 'Explore', 'About',];



const NavigationBar = () => {
  const { user, logout } = UseFireBase()
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const handleNavClicked = (page) => {
    switch (page) {
      case "Home": navigate('/home')
        break;
      case "Explore": navigate('/explore')
        break;
      case "About": navigate('/about')
        break;
      default: navigate('/home')
    }


  }
  const handleLogOut = () => {
    logout()
  }
  const goToLogIn = () => {
    navigate('/signIn')
  }
  const gotToDashboard = () => {
    navigate('/dashboard')
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };




  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string?.length; i += 1) {
      hash = string?.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`,
    };
  }

  const handleSearch = (e) => {
    console.log(e.target.value);
  }
  const onhover = {
    backgroundColor: 'green',
    paddingTop: '50px'
  }
  const normal = {
    backgroundColor: 'red',
    paddingTop: '50px'
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#283442" }} >
        <Container maxWidth="xl" >
          <Toolbar disableGutters >

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            >
              Deal&Sale
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              Deal&Sale
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Paper component="form" sx={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
                <InputBase
                  sx={{ ml: 1, flex: 1, }}
                  placeholder="Search Your Product"
                  inputProps={{ 'aria-label': 'search What You want' }}
                />
                <Button type="submit" sx={{ p: '10px', backgroundColor: '#FE9C00', color: 'white' }} aria-label="search"   >
                  <SearchIcon />
                </Button>
              </Paper>
            </Box>



            <Box sx={{ flexGrow: 0 }}>
              {
                user.email ? <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center"
                  }}
                >
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    {
                      user.photoURL ? (<img src={user.photoURL} style={{ borderRadius: "50%", width: "50%" }} alt="" />)
                        :
                        (<Avatar {...stringAvatar(user?.displayName)} />)
                    }

                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={gotToDashboard}>Dashboard</MenuItem>
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                  </Menu>
                </div> : <Button onClick={goToLogIn} style={{ color: 'black' }}  >Login</Button>
              }

            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ backgroundColor: '#283442', }}>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'center', width: '100%' }}>
          <Paper component="form" sx={{ width: '90%', display: 'flex', justifyContent: 'space-between' }}>
            <InputBase
              sx={{ ml: 1, flex: 1, }}
              placeholder="Search Your Product"
              inputProps={{ 'aria-label': 'search What You want' }}
            />
            <Button type="submit" sx={{ p: '10px', backgroundColor: '#FE9C00', color: 'white' }} aria-label="search"   >
              <SearchIcon />
            </Button>
          </Paper>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center" 
                  style={{ fontWeight: "700", color: 'white', }}
                  onClick={() => handleNavClicked(page)}>{page}</Typography>
              </MenuItem>
            ))}
          </Box>
        </Box>
      </Box>
    </Box >
  );
};

export default NavigationBar;