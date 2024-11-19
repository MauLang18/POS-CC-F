import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Platform } from "@angular/cdk/platform";
import { DOCUMENT } from "@angular/common";
import { Component, Inject, LOCALE_ID, Renderer2 } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IconsService } from "@shared/services/icons.service";
import { Settings } from "luxon";
import { filter, map } from "rxjs/operators";
import { ConfigName } from "../@vex/interfaces/config-name.model";
import { ConfigService } from "../@vex/services/config.service";
import { NavigationService } from "../@vex/services/navigation.service";
import { Style, StyleService } from "../@vex/services/style.service";

@Component({
  selector: "vex-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "vex";

  constructor(
    private configService: ConfigService,
    private styleService: StyleService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) {
    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, "is-blink");
    }

    this.configService.updateConfig({
      sidenav: {
        title: "CustomCodeCR",
        imageUrl: "/assets/img/demo/logo.svg",
        showCollapsePin: true,
      },
    });

    this.route.queryParamMap
      .pipe(
        map(
          (queryParamMap) =>
            queryParamMap.has("rtl") &&
            coerceBooleanProperty(queryParamMap.get("rtl"))
        )
      )
      .subscribe((isRtl) => {
        this.document.body.dir = isRtl ? "rtl" : "ltr";
        this.configService.updateConfig({
          rtl: isRtl,
        });
      });

    this.route.queryParamMap
      .pipe(filter((queryParamMap) => queryParamMap.has("layout")))
      .subscribe((queryParamMap) =>
        this.configService.setConfig(queryParamMap.get("layout") as ConfigName)
      );

    this.route.queryParamMap
      .pipe(filter((queryParamMap) => queryParamMap.has("style")))
      .subscribe((queryParamMap) =>
        this.styleService.setStyle(queryParamMap.get("style") as Style)
      );

    this.navigationService.items = [
      {
        type: "dropdown",
        label: "Catálogo",
        icon: IconsService.prototype.getIcon("icManage"),
        children: [
          {
            type: "link",
            label: "Categorias",
            route: "categorias",
          },
          {
            type: "link",
            label: "Productos y Servicios",
            route: "productos-servicios",
          },
          {
            type: "link",
            label: "Licencias",
            route: "licencias",
          },
          {
            type: "link",
            label: "Proyectos",
            route: "proyectos",
          },
        ],
      },
      {
        type: "link",
        label: "Clientes",
        route: "clientes",
        icon: IconsService.prototype.getIcon("icDepartment"),
      },
      {
        type: "link",
        label: "Proveedores",
        route: "proveedores",
        icon: IconsService.prototype.getIcon("icDepartment"),
      },
      {
        type: "link",
        label: "Usuarios",
        route: "usuarios",
        icon: IconsService.prototype.getIcon("icDepartment"),
      },
      {
        type: "dropdown",
        label: "Datos",
        icon: IconsService.prototype.getIcon("icManage"),
        children: [
          {
            type: "link",
            label: "Tipos de Creditos",
            route: "tipos-de-creditos",
          },
          {
            type: "link",
            label: "Tipos de Documentos",
            route: "tipos-de-documentos",
          },
          {
            type: "link",
            label: "Tipos de Licencias",
            route: "tipos-de-licencias",
          },
          {
            type: "link",
            label: "Metodos de Pagos",
            route: "metodos-de-pago",
          },
          {
            type: "link",
            label: "Status",
            route: "status",
          },
          {
            type: "link",
            label: "Tipos de Plantillas",
            route: "tipos-de-plantillas",
          },
          {
            type: "link",
            label: "Tipos de Vouchers",
            route: "tipos-de-vouchers",
          },
          {
            type: "link",
            label: "Unidades de Medida",
            route: "unidades-de-medida",
          },
        ],
      },
      {
        type: "dropdown",
        label: "Plantillas",
        icon: IconsService.prototype.getIcon("icManage"),
        children: [
          {
            type: "link",
            label: "Plantillas de Documentos",
            route: "plantillas-de-documentos",
          },
          {
            type: "link",
            label: "Plantillas de Email",
            route: "plantillas-de-emails",
          },
        ],
      },
      {
        type: "dropdown",
        label: "Procesos",
        icon: IconsService.prototype.getIcon("icSales"),
        children: [
          {
            type: "link",
            label: "Compras",
            route: "proceso-compra",
          },
          {
            type: "link",
            label: "Cotizaciones",
            route: "proceso-cotizacion",
          },
          {
            type: "link",
            label: "Ventas",
            route: "proceso-venta",
          },
          {
            type: "link",
            label: "Facturas",
            route: "facturas",
          },
        ],
      },
    ];
  }
}
