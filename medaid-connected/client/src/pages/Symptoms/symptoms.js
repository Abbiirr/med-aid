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
import axios from "axios";

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

  const [diseases, setDiseases] = useState([]);

  useEffect(() => {

    const searchDiseases = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/disease`
        );
        setDiseases(response.data);
      } catch (error) {
        if (error) console.log("error");
      }
    };
    searchDiseases();
    //console.log("Diseases: ",diseases)
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      className="box"
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 420,
      }}
    >
      <div>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {diseases &&
            diseases.map((disease, i) => (
              <Tab label={disease.name} {...a11yProps(i)} />
            ))}
        </Tabs>
      </div>

      <div>
        {diseases.map((disease, i) => (
        <TabPanel value={value} index={i}>
          <List>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={disease.name} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText

                primary={disease.symptoms + " "}
                secondary={
                  <React.Fragment>
                    <Typography

                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"

                      color="text.primary"
                    >
                      {disease.specialty}
                    </Typography>
                    {
                      " Gonna write something "
                    }
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </TabPanel>
      ))
      }        
      </div>
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
