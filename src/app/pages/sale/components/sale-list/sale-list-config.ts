import { TableColumns } from "@shared/models/list-table.interface";
import { SearchOptions } from "@shared/models/search-options.interface";
import { GenericValidators } from "@shared/validators/generic-validators";
import {
  ProductDetailsResponse,
  SaleResponse,
} from "../../models/sale-response.interface";
import { IconsService } from "@shared/services/icons.service";

const searchOptions: SearchOptions[] = [
  {
    label: "Cliente",
    value: 1,
    placeholder: "Buscar por Cliente",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite letras y/o números en esta búsqueda.",
    icon: "icName",
  },
  {
    label: "Voucher",
    value: 2,
    placeholder: "Buscar por Vocuher",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite letras y/o números en esta búsqueda.",
    icon: "icName",
  },
];

const searchOptionsProducts: SearchOptions[] = [
  {
    label: "Código",
    value: 1,
    placeholder: "Buscar por Código",
    validation: [GenericValidators.alphanumeric],
    validation_desc: "Sólo se permite letras y/o números en esta búsqueda.",
    icon: "icName",
  },
  {
    label: "Nombre",
    value: 2,
    placeholder: "Buscar por Nombre",
    validation: [GenericValidators.defaultName],
    validation_desc: "Sólo se permite letras en esta búsqueda.",
    icon: "icName",
  },
];

const tableColumns: TableColumns<SaleResponse>[] = [
  {
    label: "VOUCHER",
    cssLabel: ["font-bold", "text-sm"],
    property: "voucherNumber",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "textUppercase",
    sticky: true,
    sort: true,
    sortProperty: "voucherNumber",
    visible: true,
    download: true,
  },
  {
    label: "CLIENTE",
    cssLabel: ["font-bold", "text-sm"],
    property: "customer",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "textUppercase",
    sticky: true,
    sort: true,
    sortProperty: "customer",
    visible: true,
    download: true,
  },
  {
    label: "MONTO TOTAL",
    cssLabel: ["font-bold", "text-sm"],
    property: "total",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "currency",
    sticky: true,
    sort: true,
    sortProperty: "total",
    visible: true,
    download: true,
  },
  {
    label: "F. DE VENTA",
    cssLabel: ["font-bold", "text-sm"],
    property: "auditCreateDate",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "datetime",
    sticky: true,
    sort: true,
    sortProperty: "auditCreateDate",
    visible: true,
    download: true,
  },
  {
    label: "STATUS",
    cssLabel: ["font-bold", "text-sm"],
    property: "status",
    cssProperty: ["font-semibold", "text-sm", "text-left"],
    type: "textUppercase",
    sticky: true,
    sort: true,
    sortProperty: "status",
    visible: true,
    download: true,
  },
  {
    label: "",
    cssLabel: [],
    property: "icVisibility",
    cssProperty: [],
    type: "icon",
    action: "viewDetail",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
  {
    label: "",
    cssLabel: [],
    property: "icReport",
    cssProperty: [],
    type: "icon",
    action: "report",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
  {
    label: "",
    cssLabel: [],
    property: "icCancel",
    cssProperty: [],
    type: "icon",
    action: "cancel",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
];

const tableColumnsProducts: TableColumns<ProductDetailsResponse>[] = [
  {
    label: "",
    cssLabel: ["font-bold", "text-xxs"],
    property: "image",
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "image",
    sticky: true,
    sort: true,
    sortProperty: "image",
    visible: true,
    download: true,
  },
  {
    label: "CÓDIGO",
    cssLabel: ["font-bold", "text-xxs"],
    property: "code",
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "textUppercase",
    sticky: false,
    sort: true,
    sortProperty: "code",
    visible: true,
    download: true,
  },
  {
    label: "NOMBRE",
    cssLabel: ["font-bold", "text-xxs"],
    property: "name",
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    subProperty: "category",
    cssSubProperty: ["text-xxs", "text-am-gray", "uppercase", "text-left"],
    type: "text",
    sticky: false,
    sort: true,
    sortProperty: "name",
    visible: true,
    download: true,
  },
  {
    label: "CANTIDAD",
    cssLabel: ["font-bold", "text-xxs"],
    property: "quantity",
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "quantity",
    sticky: false,
    sort: true,
    sortProperty: "quantity",
    visible: true,
    download: true,
  },
  {
    label: "PRECIO U.",
    cssLabel: ["font-bold", "text-xxs"],
    property: "price",
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "price",
    sticky: false,
    sort: true,
    sortProperty: "price",
    visible: true,
    download: true,
  },
  {
    label: "TOTAL",
    cssLabel: ["font-bold", "text-xxs"],
    property: "total",
    cssProperty: ["font-semibold", "text-xs", "text-left"],
    type: "total",
    sticky: false,
    sort: true,
    sortProperty: "total",
    visible: true,
    download: true,
  },
  {
    label: "",
    cssLabel: [],
    property: "icAdd",
    cssProperty: [],
    type: "icon",
    action: "addDetail",
    sticky: false,
    sort: false,
    visible: true,
    download: false,
  },
];

const filters = {
  numFilter: 0,
  textFilter: "",
  startDate: "",
  endDate: "",
  refresh: false,
};

const resetFilters = {
  numFilter: 0,
  textFilter: "",
  startDate: "",
  endDate: "",
  refresh: false,
};

const getInputs: string = "";

export const componentSettings = {
  icPurcharse: IconsService.prototype.getIcon("icSales"),
  searchOptions,
  searchOptionsProducts,
  tableColumns,
  tableColumnsProducts,
  initialSort: "Id",
  initialSortDir: "desc",
  filters,
  resetFilters,
  getInputs,
  filename: "listado-de-ventas",
};
