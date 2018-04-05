import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPreferenceRoutingModule } from './user-preference-routing.module';
import { UserSettingComponent } from './user-setting/user-setting.component';

@NgModule({
  imports: [
    CommonModule,
    UserPreferenceRoutingModule
  ],
  declarations: [UserSettingComponent]
})
export class UserPreferenceModule { }
