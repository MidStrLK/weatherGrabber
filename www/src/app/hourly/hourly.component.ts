import { Component, OnInit } from '@angular/core'
import { HttpClient} from '@angular/common/http';

@Component({
    selector: 'hourly',
    templateUrl: './hourly.component.html',
    styleUrls: ['./hourly.component.css']
})

export class HourlyComponent implements OnInit {
    hourlyData: any;
    timeLine: any[];
    hourlyRequestIsActive: boolean = true;

    constructor(private  http: HttpClient){}

    ngOnInit(){
        this.http.get('/api/hourly?time=' + this.getCurrentTime()).subscribe(data => {
            this.timeLine = this.getTimeLine();
            const length = this.timeLine.length - 1;

            data.forEach( val => {val.items.length = length});

            this.hourlyData = data;

            this.hourlyRequestIsActive = false;
        });
    }

    getCurrentTime(){
        return new Date().getHours()
    }

    getTimeLine(){
        const date = new Date();
        const time = date.getHours();
        let result = [''];

        for(let i = time; i<25; i++){
            result.push(i);
        }

        return result;
    }

}


