import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpProvidersHttpProvider {

  apiKey: string = 'de8819b6-04fc-4c15-ade9-52ed030e286b';

  constructor(public http: HttpClient) {
    console.log('Hello HttpProvidersHttpProvider Provider');
  }

  fetch(data, method, url){
    switch(method){
        case 'GET': {
            return this.http.get(`${url}`)
                .map((res: any) => res);
        }
        case 'POST': {
            return this.http.post(`${url}`, data)
                .map((res: any) => res);
        }
        case 'PUT': {
            return this.http.put(`${url}`, data)
                .map((res: any) => res);
        }
        case 'DELETE': {
            return this.http.delete(`${url}`)
                .map((res: any) => res);
        }
    }
  }

}
