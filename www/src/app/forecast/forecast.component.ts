import { Component, OnInit } from '@angular/core'
import { HttpClient} from '@angular/common/http';

@Component({
    selector: 'forecast',
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.css']
})

export class ForecastComponent implements OnInit {
    forecastData: any;
    dayLine: any[];
    forecastRequestIsActive: boolean = true;

    constructor(private  http: HttpClient){}

    ngOnInit(){
        this.http.get('/api/forecast').subscribe(data => {
            this.forecastData = data;
            this.dayLine = this.getDayLine(data);

            this.forecastRequestIsActive = false;
        });
    }

    getDayLine(data){
        const date = new Date();
        const day = date.getDate();
        let count = 0;
        let result: any[] = [''];

        function addDate(days: number) {
            let today = new Date(),
                inWeek = new Date();

            inWeek.setDate(today.getDate() + days);

            return inWeek.getDate() + '.' + inWeek.getMonth()+1;
        }

        data.forEach(item => {
            if(count < item.items.length) count = item.items.length;
        });

        for(let i:number = 0; i < count; i++){
            result.push(addDate(i));
        }

        return result;
    }

}
