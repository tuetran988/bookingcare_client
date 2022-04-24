import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import specialtyImg from "../../../assets/specialty/co-xuong-khop.jpg";

class Specialty extends Component {
  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div className="section-specialty">
        <div className="specialty-container">
          <div className="specialty-header">
            <span className="title-section"> Chuyen Khoa Pho Bien</span>
            <button className="btn-section">Xem them</button>
          </div>
          <div className="specialty-body">
            <Slider {...settings}>
              <div className="specialty-customize">
                <div className="bg-image"></div>
                <div>Co xuong khop 1</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image"></div>
                <div>Co xuong khop 2</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image"></div>
                <div>Co xuong khop 3</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image"></div>
                <div>Co xuong khop 4</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image"></div>
                <div>Co xuong khop 5</div>
              </div>
              <div className="specialty-customize">
                <div className="bg-image"></div>
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
