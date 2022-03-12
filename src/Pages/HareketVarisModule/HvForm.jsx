import React, { Component } from 'react'
import Personel  from '../PersonelModule/Personel'
import DialogService from '../../dialog/DialogService'

export default class HvForm extends Component {
  async formAc() {

    let frm = DialogService.create();
    this.ref1 = React.createRef();


    let cev = await frm.show({
			refForm: this.ref1,
			title: "_title",
			formBody: (
				<div>
					<Personel ref={this.ref1}/>
				
				</div>
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
