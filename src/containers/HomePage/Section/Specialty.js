import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import Slider from "react-slick";

import specialtyImg from "../../../assets/specialty/co-xuong-khop.jpg";

class Specialty extends Component {
  render() {
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section"> Chuyen Khoa Pho Bien</span>
            <button className="btn-section">Xem them</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-specialty"></div>
                <div>Co xuong khop 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty"></div>
                <div>Co xuong khop 2</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty"></div>
                <div>Co xuong khop 3</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty"></div>
                <div>Co xuong khop 4</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty"></div>
                <div>Co xuong khop 5</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty"></div>
                <div>Co xuong khop 6</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
