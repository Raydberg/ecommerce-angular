import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadChildren: () => import("./shared/store-front.routes")
    }
];
