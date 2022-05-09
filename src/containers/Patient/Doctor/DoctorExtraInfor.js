import React, { Component } from "react";
import { connect } from "react-redux";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";
import "./DoctorExtraInfor.scss";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
    };
  }
  async componentDidMount() {}
  componentDidUpdate(prevProps, PrevState, snapshot) {}

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    let { isShowDetailInfor } = this.state;
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">Dia Chi Kham</div>
          <div className="name-clinic">Phong Kham chuyen khoa </div>
          <div className="detail-address">207 pho hue-hai ba trung-hanoi</div>
        </div>
        <div className="content-down">
          {isShowDetailInfor === false && (
            <div className="short-infor">
              Gia Kham 250000 vnd.
              <span onClick={() => this.showHideDetailInfor(true)}>
                xem chi tiet
              </span>
            </div>
          )}
          {isShowDetailInfor === true && (
            <>
              <div className="title-price">Gia Kham</div>
              <div className="detail-infor">
                <div className="price">
                  <span className="left">Gia Khams</span>
                  <span className="right">250000</span>
                </div>
                <div className="note">blabal xuong khop</div>
              </div>
              <div className="payment">blabalngui benh co the dit cncncn</div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfor(false)}>
                  an bang gia
                </span>
              </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
