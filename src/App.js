import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { render } from 'react-dom';
import DialogService from "./dialog/DialogService";
import Personel from './Personel'



class App extends Component {
  constructor() {
    super();
   
  }

  async formAc() {
    var frm = DialogService.create({});

		const cev = await frm.show({
			title: "Başlama/Erteleme Bildirimi Gereken İşleryy",
			isContainer:true,
			formBody: <Personel />,
			showFooter: true,
			width: 650,
			okText: (
				<span>
					Tamamx
				</span>
			),
			cancelText: (
				<span>
				Uygulamadan Çıkxx
				</span>
			)
		});

    alert(cev);
  }

  render() {
    return (
      <div className="container-fluid">

        <span>xxx</span>
            <button 
                className="button is-danger" 
                style={{marginTop:10}}
                value={2}
                onClick={e=>{this.formAc()}}
              >
                Sil
            </button>

            <span>xxx</span>
      </div>
    );
  }
}


export default hot(App);