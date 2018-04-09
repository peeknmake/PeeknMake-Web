import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatToolbarModule, MatRadioModule, MatSidenavModule,
    MatListModule, MatIconModule,MatMenuModule
} from '@angular/material';


@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        MatToolbarModule, MatRadioModule, MatSidenavModule,
        MatListModule, MatIconModule,MatMenuModule
    ],
    declarations: []
})
export class MatModuleModule { }
