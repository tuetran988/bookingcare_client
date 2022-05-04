import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import "./TableManageUser.scss";

////////////////////////////////
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import "./ManageDoctor.scss";
import Select from "react-select";
import {getDetailInforDoctor} from "../../../services/userService";
import {CRUD_ACTIONS} from '../../../utils/constant'
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);
// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];
class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      listDoctors: [],
      hasOldData:false,
      action:'',
    };
  }
  async componentDidMount() {
    this.props.fetchAllDoctors();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleChange = async(selectedDoctor) => {
    this.setState({ selectedDoctor });
    let res = await getDetailInforDoctor(selectedDoctor.value);
    if(res && res.errCode === 0 && res.data && res.data.Markdown){
      let markdown = res.data.Markdown;
      this.setState({
      contentMarkdown: markdown.contentMarkdown,
      contentHTML: markdown.contentHTML,
      description: markdown.description,
      hasOldData:true,
      })
    }else{
      this.setState({
      contentMarkdown:'',
      contentHTML:'',
      description:'',
      hasOldData:false,
      })
    }
  };

  handleSaveContentMarkdown = () => {
    let {hasOldData} = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action : hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
    });
    toast.success("SAVE DETAILS DOCTOR SUCCEED");
  };

  handleOnChangeDesc = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  render() {
    let{hasOldData} = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tao them thong tin doctor</div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label>Chon bac si</label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChange}
              options={this.state.listDoctors}
            />
          </div>
          <div className="content-right form-group">
            <label>Thong tin gioi thieu :</label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(e) => this.handleOnChangeDesc(e)}
              value={this.state.description}
            >
            </textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={hasOldData ? "save-content-doctor":"create-content-doctor"}
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {
             hasOldData ? <span>Luu Thong tin</span> : <span>Tao Thong tin </span>
          }
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
