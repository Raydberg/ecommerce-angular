import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { isAdminGuard } from '@auth/guards/is-admin.guard';
import { notAuthenticatedGuard } from '@auth/guards/not-authenticated.guard';
import { AuthService } from '@auth/services/auth.service';

export const routes: Routes = [
    // El orden importa
    {
        path: "auth",
        loadChildren: () => import("./modules/auth/auth.routes"),
        canMatch: [
            notAuthenticatedGuard
        ]
    },
    {
        path: "admin",
        loadChildren: () => import("./modules/admin/admin.routes"),
        canMatch: [
            isAdminGuard
        ]
    },
    {
        path: "",
        loadChildren: () => import("./shared/store-front.routes")
    }
];
