import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils/constant";
import Select from "react-select";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userService";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
    };
  }

  setArrDays =(language) => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        object.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(object);
    }
    this.setState({
      allDays: arrDate,
    });
  };

  async componentDidMount() {
    this.setArrDays(this.props.language);
  }
  componentDidUpdate(prevProps, PrevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      this.setArrDays(this.props.language);
    }
    }
    handleOnChangeSelect = async (e) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent!==-1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = e.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            console.log("checkres", res);
        }
    }

  render() {
    let { allDays } = this.state;
    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select onChange={(e)=>this.handleOnChangeSelect(e)}>
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="all-available-time"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
