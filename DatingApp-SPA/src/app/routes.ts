import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',   // We could use this path for areas of our application right now there is no are thats way is an empty string
                    //  but we could set something like 'admin' which would be our area name in the route
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, resolve: { users: MemberListResolver } },
            { path: 'members/:id', component: MemberDetailComponent, resolve: { user: MemberDetailResolver } },
            { path: 'member/edit', component: MemberEditComponent, resolve: { user: MemberEditResolver },
                canDeactivate: [PreventUnsavedChanges] },
            { path: 'lists', component: ListsComponent, resolve: { users: ListsResolver }}
        ],
    }, // Implement Auth guard for a multiple routes
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] }, // Implement Auth guard for a single route
    { path: '**', redirectTo: '', pathMatch: 'full' } // This one has to be at the end
];
