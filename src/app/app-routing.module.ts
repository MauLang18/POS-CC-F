import { VexRoutes } from "src/@vex/interfaces/vex-route.interface";
import { CustomLayoutComponent } from "./custom-layout/custom-layout.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { AuthGuard } from "@shared/guards/auth.guard";
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule } from "@angular/router";

const childrenRoutes: VexRoutes = [
  {
    path: "categorias",
    loadChildren: () =>
      import("./pages/category/category.module").then((m) => m.CategoryModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "tipos-de-creditos",
    loadChildren: () =>
      import("./pages/credit-type/credit-type.module").then(
        (m) => m.CreditTypeModule
      ),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "clientes",
    loadChildren: () =>
      import("./pages/customer/customer.module").then((m) => m.CustomerModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "plantillas-de-documentos",
    loadChildren: () =>
      import("./pages/document-template/document-template.module").then(
        (m) => m.DocumentTemplateModule
      ),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "tipos-de-documentos",
    loadChildren: () =>
      import("./pages/document-type/document-type.module").then(
        (m) => m.DocumentTypeModule
      ),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "plantillas-de-emails",
    loadChildren: () =>
      import("./pages/email-template/email-template.module").then(
        (m) => m.EmailTemplateModule
      ),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "facturas",
    loadChildren: () =>
      import("./pages/invoice/invoice.module").then((m) => m.InvoiceModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "licencias",
    loadChildren: () =>
      import("./pages/license/license.module").then((m) => m.LicenseModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "tipos-de-licencias",
    loadChildren: () =>
      import("./pages/license-type/license-type.module").then(
        (m) => m.LicenseTypeModule
      ),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "metodos-de-pago",
    loadChildren: () =>
      import("./pages/payment-method/payment-method.module").then(
        (m) => m.PaymentMethodModule
      ),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "productos-servicios",
    loadChildren: () =>
      import("./pages/product-service/product-service.module").then(
        (m) => m.ProductServiceModule
      ),
  },
  {
    path: "proyectos",
    loadChildren: () =>
      import("./pages/project/project.module").then((m) => m.ProjectModule),
  },
  {
    path: "status",
    loadChildren: () =>
      import("./pages/status/status.module").then((m) => m.StatusModule),
  },
  // {
  //   path: "clientes",
  //   loadChildren: () =>
  //     import("./pages/client/client.module").then((m) => m.ClientModule),
  // },
  // {
  //   path: "almacenes",
  //   loadChildren: () =>
  //     import("./pages/warehouse/warehouse.module").then(
  //       (m) => m.WarehouseModule
  //     ),
  // },
  // {
  //   path: "productos",
  //   loadChildren: () =>
  //     import("./pages/product/product.module").then((m) => m.ProductModule),
  // },
  // {
  //   path: "proceso-ventas",
  //   loadChildren: () =>
  //     import("./pages/sale/sale.module").then(
  //       (m) => m.SaleModule
  //     ),
  // },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

const routes: VexRoutes = [
  {
    path: "",
    redirectTo: "categorias",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/auth/auth.module").then((m) => m.AuthModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "",
    component: CustomLayoutComponent,
    children: childrenRoutes,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "corrected",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
