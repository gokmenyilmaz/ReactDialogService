import React, { Component } from 'react'
import Personel  from '../PersonelModule/Personel'
import DialogService from '../../dialog/DialogService'

export default class HvForm extends Component {
  async formAc() {

    let frm = DialogService.create();

    let cev = await frm.show({
			title: "_title",
			formBody: (

					<Personel ref={React.createRef()}/>

			),
			okText: "Tamam",
      cancelText: (
				<span>
				Uygulamadan Çıkxx
				</span>
			),
			showFooter: true,
			width: 400,
			height: 300
		});

		if (cev == false) {
      alert(cev);
			return;
		}
    
    alert("Tamam");

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
