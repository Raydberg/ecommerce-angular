import { AdminLayout } from "@admin/layouts/admin-layout/admin-layout";
import { CategoryAdminPage } from "@admin/pages/category-admin-page/category-admin-page";
import { Dashboard } from "@admin/pages/dashboard/dashboard";
import { ProductAdminPage } from "@admin/pages/product-admin-page/product-admin-page";
import { ProductsAdminPage } from "@admin/pages/products-admin-page/products-admin-page";
import { Routes } from "@angular/router";

const adminRoutes: Routes = [
    {
        path: "",
        component: AdminLayout,
        children: [
            { path: "", component: Dashboard },
            { path: "products", component: ProductsAdminPage },
            { path: "products/:id", component: ProductAdminPage },
            { path: "category", component: CategoryAdminPage },
            { path: "category/:id", component: CategoryAdminPage },
            { path: "**", redirectTo: "products" }
        ]
    }
]

export default adminRoutes;