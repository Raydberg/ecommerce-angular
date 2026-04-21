import { AdminLayout } from "@admin/layouts/admin-layout/admin-layout";
import { CategoryAdminPage } from "@admin/pages/category-admin-page/category-admin-page";
import { Dashboard } from "@admin/pages/dashboard/dashboard";
import { ProductAdminPage } from "@admin/pages/product-admin-page/product-admin-page";
import { ProductsAdminPage } from "@admin/pages/products-admin-page/products-admin-page";
import { UserAdminPage } from "@admin/pages/user-admin-page/user-admin-page";
import { UsersAdminPage } from "@admin/pages/users/users-admin-page";
import { Routes } from "@angular/router";
import { ProfilePage } from "src/app/modules/profile/components/profile-page";

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
      { path: "users", component: UsersAdminPage },
      { path: "users/:id", component: UserAdminPage },
      { path: "profile", component: ProfilePage },
      { path: "**", redirectTo: "products" }
    ]
  }
]

export default adminRoutes;
