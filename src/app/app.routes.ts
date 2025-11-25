import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'transfer',
        loadComponent: () => import('./pages/transaction/transaction.component').then(c => c.TransactionComponent)
    },
    {
        path: 'account',
        loadComponent: () => import('./pages/account/account.component').then(c => c.AccountComponent)
    }

];
