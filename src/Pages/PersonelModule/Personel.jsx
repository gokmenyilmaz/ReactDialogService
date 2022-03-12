import React, { Component } from 'react'

export default class Personel extends Component {


    getValidateText=()=>{
        return "Hata var;İsim yazılı değil"
    }

    closing() // Dialogservice implemantasyon
	{
	
		var formValidateText = this.getValidateText();

		if (formValidateText.length > 0) {
			var mtext = {};
			var liste = formValidateText.split(";");
			var pList = [];

			for (const item of liste) {
				const paragraph = React.createElement("p", {}, item);
				pList.push(paragraph);
			}

            alert(formValidateText);
		
			return false;
		}

		return true;
	}
    render() {
        return (
            <div>
                Personel
            </div>
        )
    }
}
