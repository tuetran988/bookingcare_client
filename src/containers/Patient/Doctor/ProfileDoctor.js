import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  componentDidUpdate(prevProps, PrevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
    }
  }
  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let date = language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment.unix(+dataTime.date / 1000).locale('en').format("ddd - MM/DD/YYYY");
      let time = language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn
      return (
        <>
          <div>{` ${time} - ${date} `}</div>
          <div>
            <FormattedMessage id="patient.booking-modal.priceBooking" />
          </div>
        </>
      );
    } else {
      return <></>;
    }
  };

  render() {
    let { dataProfile } = this.state;
    let { language, isShowDescriptionDoctor, dataTime } = this.props;
    let nameVi = "";
    let nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}:${dataProfile.lastName} ${dataProfile.firstName} `;
      nameEn = `${dataProfile.positionData.valueEn}:${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {isShowDescriptionDoctor ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>
        <div className="price">
          <FormattedMessage id="patient.extra-infor-doctor.price" />
          {dataProfile &&
          dataProfile.Doctor_Infor &&
          language === LANGUAGES.VI ? (
            <NumberFormat
              className="currency"
              value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" VND "}
            />
          ) : (
            ""
          )}
          {dataProfile &&
          dataProfile.Doctor_Infor &&
          language === LANGUAGES.EN ? (
            <NumberFormat
              className="currency"
              value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" USD "}
            />
          ) : (
            ""
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
