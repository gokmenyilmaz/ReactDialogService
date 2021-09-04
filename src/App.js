import React, { Component } from 'react';
import { render } from 'react-dom';
import DialogService from "./dialog/DialogService";
import Personel from './Personel'



export default class App extends Component {
  constructor() {
    super();
   
  }

  async formAc() {
    var frm = DialogService.create({});

		const cev = await frm.show({
			title: "Başlama/Erteleme Bildirimi Gereken İşler",
			isContainer:true,
			formBody: <Personel />,
			showFooter: true,
			width: 650,
			okText: (
				<span>
					Tamam
				</span>
			),
			cancelText: (
				<span>
				Uygulamadan Çık
				</span>
			)
		});

    alert(cev);
  }

  render() {
    return (
      <div className="container-fluid">
            <button 
                className="button is-danger"
                value={2}
                onClick={e=>{this.formAc()}}
              >
                Delete
            </button>
      </div>
    );
  }
}
