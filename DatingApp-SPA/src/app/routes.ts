import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',   // We could use this path for areas of our application right now there is no are thats way is an empty string
                    //  but we could set something like 'admin' which would be our area name in the route
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent },
            { path: 'lists', component: ListsComponent }
        ],
    }, // Implement Auth guard for a multiple routes
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] }, // Implement Auth guard for a single route
    { path: '**', redirectTo: '', pathMatch: 'full' } // This one has to be at the end
];
