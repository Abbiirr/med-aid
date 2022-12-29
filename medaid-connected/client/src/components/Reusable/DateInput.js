import React from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import CustomInput from "./CustomInput";
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
            maxDate={new Date().setDate(new Date().getDate() + 7)}
            minDate={new Date()}
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

export default DateInput;
