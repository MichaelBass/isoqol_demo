import { Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-home-overlay',
	templateUrl: './home-overlay.component.html',
	styleUrls: ['./home-overlay.component.scss']
})
export class HomeOverlayComponent implements OnInit {



	isHidden:Boolean=true;

	constructor() { }

	ngOnInit() {
		// this.isHidden = this.helper.getCookie('overlayVideoDisabled')!='disabled';
		// this.helper.debug('hidden',this.isHidden,this.helper.getCookie('overlayVideoDisabled'));

	}

	closeModal(){
		this.isHidden=false;
		//his.helper.setCookie('overlayVideoDisabled','disabled',365);
	}
	
}