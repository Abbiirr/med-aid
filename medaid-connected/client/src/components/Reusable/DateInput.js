import React from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import CustomInput from "./CustomInput";

import { useState, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";

// import "./styles.css";

const MyContext = React.createContext();

class DateInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
    };
    this.handleChange = this.handleChange.bind(this);
    console.log(props);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
    console.log("Inside DateInput : ", date);
  }

  // render() {
  //   return (
  //     <div>
  //       <DatePicker
  //         selected={this.state.startDate}
  //         onChange={this.handleChange}
  //         customInput={<CustomInput />}
  //         placeholderText="Get Appointment"
  //       />
  //     </div>
  //   );
  // }

  render() {
    return (
      <MyContext.Provider value={this.state.startDate}>
        <div>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            customInput={<CustomInput />}
            placeholderText="Get Appointment"
          />
        </div>
      </MyContext.Provider>
    );
  }
}

///------------functional component-----------------

const DateInput2 = ({ onValueChange }) => {
  const [value, setValue] = useState("");

  // function handleButtonClick() {
  //   // Generate a new value
  //   //const newValue = Math.random();
  //   //setValue(newValue);
  //   console.log(value)
  //   if (onValueChange) {
  //     onValueChange(value);
  //   }
  // }

  return (
    <div>
      <DatePicker
        selected={value}
        onChange={date => onValueChange(date.toString())}
        // customInput={<CustomInput />}
        placeholderText="Get Appointment"
      />
      {/* <button onClick={() => console.log(value)}>Generate value</button> */}
    </div>
  );

  // return (
  //   <div>
  //     <DatePicker
  //       selected={this.state.startDate}
  //       onChange={date => setSelectedDate(date)}
  //       customInput={<CustomInput />}
  //       placeholderText="Get Appointment"
  //     />
  //   </div>
  // );
};


export default DateInput2;
