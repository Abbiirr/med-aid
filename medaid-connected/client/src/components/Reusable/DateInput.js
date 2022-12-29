import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import CustomInput from "./CustomInput";
import "react-datepicker/dist/react-datepicker.css";

// import "./styles.css";

const MyContext = React.createContext();

const DateInput = ({ handleValueChange }) => {
  // constructor({ props, handleValueChange }) {
  //   super(props);
  //   this.state = {
  //     startDate: null,
  //   };
  //   this.handleValueChange = handleValueChange;
  //   this.handleChange = this.handleChange.bind(this);
  //   console.log(props);
  //   // this.props.handleValueChange(this.state.startDate);

  // }
  const [value, setValue] = useState("");
  // this.handleValueChange = handleValueChange;
  // this.handleChange = this.handleChange.bind(this);

  const handleChange = (date) => {
    this.setState({
      startDate: date,
    });

    // var date = this.state.startDate;
    // (date) => handleValueChange(date);
    // this.handleValueChange(String(date));
    // this.props.handleValueChange(String(date));
  };
  // console.log("Inside DateInput : ", date);

  return (
    <div>
      <DatePicker
        selected={value}
        maxDate={new Date().setDate(new Date().getDate() + 7)}
        minDate={new Date()}
        onChange={(date) => handleValueChange(date.toString())}
        // customInput={<CustomInput />}
        placeholderText="Get Appointment"
      />
      {/* <button onClick={() => console.log(value)}>Generate value</button> */}
    </div>
  );

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

  // return (
  //   <MyContext.Provider value={this.state.startDate}>
  //     <div>
  //       <DatePicker
  //         maxDate={new Date().setDate(new Date().getDate() + 7)}
  //         minDate={new Date()}
  //         selected={this.state.startDate}
  //         // onChange={this.handleChange}
  //         onChange={(date) => handleValueChange(date.toString())}
  //         // onInputClick={() =>
  //         //   this.props.handleValueChange(this.state.startDate)
  //         // }
  //         customInput={<CustomInput />}
  //         placeholderText="Get Appointment"
  //         // onClick={() => this.props.onValueChange(this.state.startDate)}
  //       />
  //     </div>
  //   </MyContext.Provider>
  // );
};

export default DateInput;
