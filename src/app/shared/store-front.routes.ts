import { Routes } from "@angular/router";
import { StoreFrontLayout } from "./layout/store-front-layout/store-front-layout";
import { HomePage } from "./pages/home-page/home-page";
import { GenderPage } from "./pages/gender-page/gender-page";
import { ProductPage } from "./pages/product-page/product-page";

const storeFrontRoutes: Routes = [
    {
        path: "", component: StoreFrontLayout, children: [
            { path: "", component: HomePage },
            { path: "gender/:gender", component: GenderPage },
            { path: "product/:id", component: ProductPage },
            { path: "**", loadComponent: ()=> import("./pages/not-found-page/not-found-page")  },
        ]
    },
    { path: "**", redirectTo: "" }
]

export default storeFrontRoutes;