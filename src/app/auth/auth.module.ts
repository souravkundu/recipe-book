import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared-recources/shared.module';
import { AuthRouterModule } from './auth-router.module';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        HttpClientModule,
        AuthRouterModule,
        SharedModule
    ],
    exports: [
    ]
})
export class AuthModule {}