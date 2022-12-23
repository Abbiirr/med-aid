import React from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import CustomInput from "./CustomInput";
import "react-datepicker/dist/react-datepicker.css";

// import "./styles.css";

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
  }

  render() {
    return (
      <div>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          customInput={<CustomInput placeholderText="Get Appointment" />}
          placeholderText="Get Appointment"
        />
      </div>
    );
  }
}

export default DateInput;
