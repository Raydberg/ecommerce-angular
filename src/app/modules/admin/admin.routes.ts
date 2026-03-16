import { AdminLayout } from "@admin/layouts/admin-layout/admin-layout";
import { ProductAdminPage } from "@admin/pages/product-admin-page/product-admin-page";
import { ProductsAdminPage } from "@admin/pages/products-admin-page/products-admin-page";
import { Routes } from "@angular/router";

const adminRoutes: Routes = [
    {
        path: "",
        component: AdminLayout,
        children: [
            { path: "products", component: ProductsAdminPage },
            { path: "products/:id", component: ProductAdminPage },
            { path: "**", redirectTo: "products" }
        ]
    }
]

export default adminRoutes;