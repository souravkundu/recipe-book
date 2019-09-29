import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecipeInterceptorService } from './recipes/recipe-interceptor.service';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
    imports:[
        NgxPrintModule
    ],
    exports: [
        NgxPrintModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: RecipeInterceptorService, multi: true }
    ]
})
export class CoreModule { }