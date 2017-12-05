import { Component, OnInit } from '@angular/core'
import { HttpClient} from '@angular/common/http';

@Component({
    selector: 'actual',
    templateUrl: './actual.component.html',
    styleUrls: ['./actual.component.css']
})

export class ActualComponent implements OnInit {
    actualData: any;
    actualRequestIsActive: boolean = true;

    constructor(private  http: HttpClient){}

    ngOnInit(){
        this.http.get('/api/actual').subscribe(data => {
            this.actualData = data;
            this.actualRequestIsActive = false
        });
    }

}
