import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/User/Navbar/index";
import FooterComponent from "../../components/User/Footer/index";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import "./style.scss"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="box"
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 420 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Allergies" {...a11yProps(0)} />
        <Tab label="Bronchiectasis" {...a11yProps(1)} />
        <Tab label="Common cold" {...a11yProps(2)} />
        <Tab label="Diabetes" {...a11yProps(3)} />
        <Tab label="Epilepsy" {...a11yProps(4)} />
        <Tab label="Fever" {...a11yProps(5)} />
        <Tab label="Gonorrhoea" {...a11yProps(6)} />
        <Tab label="Gonorrhoea" {...a11yProps(6)} />
        <Tab label="Gonorrhoea" {...a11yProps(6)} />
        <Tab label="Gonorrhoea" {...a11yProps(6)} />
        <Tab label="Gonorrhoea" {...a11yProps(6)} />
        <Tab label="Gonorrhoea" {...a11yProps(6)} />
        <Tab label="Gonorrhoea" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <List>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="sneezing and an itchy, runny or blocked nose"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    User 1
                  </Typography>
                  {" — Allergic rhinitis is inflammation of the inside of the nose caused by an allergen, such as pollen, dust, mould, or flakes of skin from certain animals."}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="itchy, red, watering eyes"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    User 2
                  </Typography>
                  {" — Conjunctivitis is a common condition that causes redness and inflammation of the thin layer of tissue that covers the front of the eye (the conjunctiva)."}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="wheezing, chest tightness"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    User 3
                  </Typography>
                  {" — Hemp Me pls..."}
                </React.Fragment>
              }
            />
          </ListItem>
          
        </List>
      </TabPanel>
    </Box>
  );
}

const Index = () => {

  return (
    <div>
      <NavbarComponent /><br></br>
      <VerticalTabs /><br></br>
      <FooterComponent />
    </div>
  );
};

export default Index;
