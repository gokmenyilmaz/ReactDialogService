import React, { Component } from "react";
import { render, unmountComponentAtNode } from "react-dom";


import "./DialogService.css";

class DialogService extends Component {
	/** @return {DialogService}  */

	resolve = null;

	modalHeaderId = "";
	modalFormId=""
	
	static create(props = {}) {
		let _modalId = Math.random().toString(32).split(".")[1];

		const containerElement = document.createElement("div");
		containerElement.setAttribute("id",_modalId);
		document.body.appendChild(containerElement);

		let element=React.createElement(this, {modalId:_modalId});
		

		var comp = render(element, containerElement);


		// @ts-ignore
		return comp;
	}

	constructor(props) {
		super(props);

		this.modalFormId="modal_form_" + this.props.modalId;
		this.modalHeaderId="modal_header_" + this.props.modalId;

		this.state = {
			isOpen: false,
			modalParams: {}
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

		const containerElement = document.getElementById(this.props.modalId);

		unmountComponentAtNode(containerElement);
		document.body.removeChild(containerElement);
	}

	keydownHandle = e => {
		if (e.keyCode === 27) this.handleCancel();
	};
	handleCancel() {
		this.close();
		this.resolve(false);
	}

	handleConfirm() {
		let params = this.state.modalParams;
		let modalBodyForm = params.refForm.current;

		if (params.refForm == undefined) {
			this.close();
			this.resolve(true);
			return;
		}


		if (modalBodyForm.closing == undefined) {
			this.close();
			this.resolve(true);
			return;
		}

		if(modalBodyForm.closing()===true)
		{
			this.close();
			this.resolve(true);
			return;
		}
		else
		{
			return;
		}
		
	}

	/**
	 * @param {{title: string, isContainer:boolean,formBody: object, width?:number,height?:number,
	 * showFooter:boolean,okText?:object, cancelText?:object}} params description,
	 * @return {Promise}
	 */
	show = params => {
		this.setState({ isOpen: true, modalParams: params });
		
		let el_modal_div=document.getElementById(this.modalFormId);

		this.dragElement(el_modal_div);

		return new Promise(res => {
			this.resolve = res;
		});
	};

	

	dragElement = el_modal => {

		console.log("drag");
		var pos1 = 0,
			pos2 = 0,
			pos3 = 0,
			pos4 = 0;


		let el_header_div=document.getElementById(this.modalHeaderId);
		el_header_div.onmousedown = elementMouseDown;
		el_header_div.addEventListener("touchstart",startTouch);

		function startTouch(e) {

			console.log("touchstart");

			pos3 = e.touches[0].clientX;
			pos4 = e.touches[0].clientY;

			el_header_div.addEventListener("touchstart",startTouch);
			el_header_div.addEventListener("touchmove",moveTouch);


			document.ontouchend = endTouch;
			document.ontouchmove = moveTouch;
		
		}

		function moveTouch(e) {
	
			console.log("touchmove");

			pos1 = pos3 - e.touches[0].clientX;
			pos2 = pos4 - e.touches[0].clientY;
			pos3 = e.touches[0].clientX;
			pos4 = e.touches[0].clientY;

			el_modal.style.top = el_modal.offsetTop - pos2 + "px";
			el_modal.style.left = el_modal.offsetLeft - pos1 + "px";
			
		}

		function endTouch(e) {
		
			document.ontouchend = null;
			document.ontouchmove = null;
		}


		function elementMouseDown(e) {

			console.log("mouseDown");
			e = e || window.event;
			e.preventDefault();
			pos3 = e.clientX;
			pos4 = e.clientY;

			document.onmouseup = elementMouseMoveEnd;
			document.onmousemove = elementMouseMove;
		}

		function elementMouseMove(e) {

			console.log("move");
			e = e || window.event;
			e.preventDefault();

			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;

			console.log("pos",pos1);

			el_modal.style.top = el_modal.offsetTop - pos2 + "px";
			el_modal.style.left = el_modal.offsetLeft - pos1 + "px";
		}

		function elementMouseMoveEnd() {
			document.onmouseup = null;
			document.onmousemove = null;
		}
	};

	render() {
		const { isOpen } = this.state;
		let formWidth=this.state.modalParams.width>window.innerWidth?window.innerWidth:this.state.modalParams.width;

		var footerAktifMi = this.state.modalParams.cancelText || this.state.modalParams.okText;
	

		return (
		
				<div className={!isOpen ? "gk-modal" : "gk-modal gk-is-active"}>
					<div
						id={this.modalFormId}
						style={{ width: formWidth }}
						className="gk-modal-content gk-card">
						
						<header id={this.modalHeaderId} className="gk-modal-header">
							<div className="gk-modal-title"> {this.state.modalParams.title}</div>
							<button onClick={this.handleCancel} className="gk-close">
								<span aria-hidden="true">X</span>
							</button>
						</header>

						<div
							style={{
								overflow: "auto",
							}}
							className="gk-modal-body">
							{this.state.modalParams.formBody}
						</div>

						{footerAktifMi && (
							<footer className="gk-modal-footer">
								<button
									style={{
										display: this.state.modalParams.cancelText ? "inline-block" : "none"
									}}
									className="gk-btn gk-btn-secondary"
									onClick={this.handleCancel}>
									{this.state.modalParams.cancelText}
								</button>
								<button
									style={{
										display: this.state.modalParams.okText ? "inline-block" : "none"
									}}
									className="gk-btn gk-btn-primary"
									onClick={this.handleConfirm}>
									{this.state.modalParams.okText}
								</button>
							</footer>
						)}
					</div>
				</div>
		
		);
	}
}

export default DialogService;
