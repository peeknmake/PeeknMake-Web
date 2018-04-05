import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoHomeComponent } from '../components/go-home.component';
import { SearchConfigurationComponent } from '../components/search-configuration.component';
import { UserAccountsComponent } from '../components/user-accounts.component';
import { UserInformationComponent } from '../components/user-information.component';
import { LoginCallbackComponent } from '../components/login-callback.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        GoHomeComponent,
        SearchConfigurationComponent,
        UserAccountsComponent,
        UserInformationComponent,
		LoginCallbackComponent
    ],
    exports: [
        GoHomeComponent,
        SearchConfigurationComponent,
        UserAccountsComponent,
        UserInformationComponent,
		LoginCallbackComponent
    ]
})
export class SharedModule { }
