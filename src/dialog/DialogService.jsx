import React, { Component } from "react";
import { render, unmountComponentAtNode } from "react-dom";


import "./DialogService.css";


let resolve;

class DialogService extends Component {

   /** @return {DialogService}  */

  static create(props = {}) {

    let modalId="gk-modal1";
    const modal = document.getElementById("gk-modal1");
    if(modal!==null) modalId="gk-modal2";


    let a=2;
    const containerElement = document.createElement("div");
    containerElement.setAttribute("id",modalId);
    document.body.appendChild(containerElement);

    var comp=render(<DialogService />, containerElement);

    // @ts-ignore
    return comp;
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      modalParams: {},
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);

    this.show = this.show.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keydownHandle, false);

  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownHandle, false);
  }

  close() {
    this.setState({ isOpen: false });

    let modalId="gk-modal1";
    const modal = document.getElementById("gk-modal2");
    if(modal!==null) modalId="gk-modal2";

    const containerElement = document.getElementById(modalId);

    unmountComponentAtNode(containerElement);
    document.body.removeChild(containerElement);
  }

  keydownHandle = (e) => {
    if (e.keyCode === 27) this.handleCancel();
  };
  handleCancel() {
    this.close();
    resolve(false);
  }

  handleConfirm() {
    if(this.state.modalParams.formBody.ref==null)
    {
      this.close();
      resolve(true);
      return;
    }

    var validateFunction=this.state.modalParams.formBody.ref.current;

    if(validateFunction.GetValidateText==undefined)
    {
      this.close();
      resolve(true);
      return;
    }


    var formValidateText=validateFunction.GetValidateText();

    if(formValidateText.length>0)
    {

      let x="ttt";
        var mtext={};
        var liste=formValidateText.split(";");
        var pList=[];

        for (const item of liste) {
          const paragraph = React.createElement('p', {}, item);
          pList.push(paragraph);
        }
   
    }
    else
    {
        this.close();
        resolve(true);
    }


  }


  /**
 * @param {{title: string, isContainer:boolean,formBody: object, width?:number,height?:number, 
 * showFooter:boolean,okText?:object, cancelText?:object}} params description
 */
  show(params) {
    this.setState({ isOpen: true, modalParams: params });
    return new Promise((res) => {
      resolve = res;
    });
  }

  render() {
    const { isOpen } = this.state;

    var footerAktifMi= this.state.modalParams.cancelText ||  this.state.modalParams.okText;

    return (
      
      <div  className={!isOpen ? "gk-modal" : "gk-modal gk-is-active"}>
        <div  style={{width:this.state.modalParams.width}} className="gk-modal-content gk-card">
          <header className="gk-modal-header">
            <div className="gk-modal-title"> {this.state.modalParams.title}</div>
            <button onClick={this.handleCancel} className="gk-close">
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <div style={{overflowY: this.state.modalParams.isContainer==true?'auto' :'none'}} 
                className="gk-modal-body">{this.state.modalParams.formBody}</div>

          {footerAktifMi &&
          <footer className="gk-modal-footer" >
            <button
              style={{
                display: this.state.modalParams.cancelText
                  ? "inline-block"
                  : "none",
              }}
              className="gk-btn gk-btn-secondary"
              onClick={this.handleCancel}
            >
              {this.state.modalParams.cancelText}
            </button>
            <button
              style={{
                display: this.state.modalParams.okText
                  ? "inline-block"
                  : "none",
              }}
              className="gk-btn gk-btn-primary"
              onClick={this.handleConfirm}
            >
              {this.state.modalParams.okText}
            </button>
          </footer>}
        </div>
      </div>
     
    );
  }
}

export default DialogService;
