import { HttpHeaders } from "@angular/common/http";

export const endpoint = {
  // AUTH MODULE
  LOGIN: "Login/Login",
  LOGIN_GOOGLE: "Auth/LoginWithGoogle",

  // CATEGORY MODULE
  LIST_CATEGORIES: "Category",
  LIST_SELECT_CATEGORIES: "Category/Select",
  CATEGORY_BY_ID: "Category/",
  CATEGORY_REGISTER: "Category/Create/",
  CATEGORY_EDIT: "Category/Update/",
  CATEGORY_DELETE: "Category/Delete/",

  // CREDIT_TYPE MODULE
  LIST_CREDIT_TYPES: "CreditType",
  LIST_SELECT_CREDIT_TYPES: "CreditType/Select",
  CREDIT_TYPE_BY_ID: "CreditType/",
  CREDIT_TYPE_REGISTER: "CreditType/Create/",
  CREDIT_TYPE_EDIT: "CreditType/Update/",
  CREDIT_TYPE_DELETE: "CreditType/Delete/",

  // CUSTOMER MODULE
  LIST_CUSTOMERS: "Customer",
  LIST_SELECT_CUSTOMERS: "Customer/Select",
  CUSTOMER_REGISTER: "Customer/Create/",
  CUSTOMER_EDIT: "Customer/Update/",
  CUSTOMER_BY_ID: "Customer/",
  CUSTOMER_DELETE: "Customer/Delete/",

  // DOCUMENT_TEMPLATE MODULE
  LIST_DOCUMENT_TEMPLATES: "DocumentTemplate",
  LIST_SELECT_DOCUMENT_TEMPLATES: "DocumentTemplate/Select",
  DOCUMENT_TEMPLATE_REGISTER: "DocumentTemplate/Create/",
  DOCUMENT_TEMPLATE_EDIT: "DocumentTemplate/Update/",
  DOCUMENT_TEMPLATE_BY_ID: "DocumentTemplate/",
  DOCUMENT_TEMPLATE_DELETE: "DocumentTemplate/Delete/",

  // DOCUMENT_TYPE MODULE
  LIST_DOCUMENT_TYPES: "DocumentType",
  LIST_SELECT_DOCUMENT_TYPES: "DocumentType/Select",
  DOCUMENT_TYPE_REGISTER: "DocumentType/Create/",
  DOCUMENT_TYPE_EDIT: "DocumentType/Update/",
  DOCUMENT_TYPE_BY_ID: "DocumentType/",
  DOCUMENT_TYPE_DELETE: "DocumentType/Delete/",

  // EMAIL_TEMPLATE MODULE
  LIST_EMAIL_TEMPLATES: "EmailTemplate",
  LIST_SELECT_EMAIL_TEMPLATES: "EmailTemplate/Select",
  EMAIL_TEMPLATE_REGISTER: "EmailTemplate/Create/",
  EMAIL_TEMPLATE_EDIT: "EmailTemplate/Update/",
  EMAIL_TEMPLATE_BY_ID: "EmailTemplate/",
  EMAIL_TEMPLATE_DELETE: "EmailTemplate/Delete/",

  // INVOICE MODULE
  LIST_INVOICES: "Invoice",
  LIST_SELECT_INVOICES: "Invoice/Select",
  INVOICE_REGISTER: "Invoice/Create/",
  INVOICE_EDIT: "Invoice/Update/",
  INVOICE_BY_ID: "Invoice/",
  INVOICE_DELETE: "Invoice/Delete/",

  // LICENSE MODULE
  LIST_LICENSES: "License",
  LIST_SELECT_LICENSES: "License/Select",
  LICENSE_REGISTER: "License/Create/",
  LICENSE_EDIT: "License/Update/",
  LICENSE_BY_ID: "License/",
  LICENSE_DELETE: "License/Delete/",

  // LICENSE_TYPE MODULE
  LIST_LICENSE_TYPES: "LicenseType",
  LIST_SELECT_LICENSE_TYPES: "LicenseType/Select",
  LICENSE_TYPE_REGISTER: "LicenseType/Create/",
  LICENSE_TYPE_EDIT: "LicenseType/Update/",
  LICENSE_TYPE_BY_ID: "LicenseType/",
  LICENSE_TYPE_DELETE: "LicenseType/Delete/",

  // PAYMENT_METHOD MODULE
  LIST_PAYMENT_METHODS: "PaymentMethod",
  LIST_SELECT_PAYMENT_METHODS: "PaymentMethod/Select",
  PAYMENT_METHOD_REGISTER: "PaymentMethod/Create/",
  PAYMENT_METHOD_EDIT: "PaymentMethod/Update/",
  PAYMENT_METHOD_BY_ID: "PaymentMethod/",
  PAYMENT_METHOD_DELETE: "PaymentMethod/Delete/",

  // PRODUCT_SERVICE MODULE
  LIST_PRODUCT_SERVICES: "ProductService",
  LIST_SELECT_PRODUCT_SERVICES: "ProductService/Select",
  PRODUCT_SERVICE_REGISTER: "ProductService/Create/",
  PRODUCT_SERVICE_EDIT: "ProductService/Update/",
  PRODUCT_SERVICE_BY_ID: "ProductService/",
  PRODUCT_SERVICE_DELETE: "ProductService/Delete/",

  // PROJECT MODULE
  LIST_PROJECTS: "Project",
  LIST_SELECT_PROJECTS: "Project/Select",
  PROJECT_REGISTER: "Project/Create/",
  PROJECT_EDIT: "Project/Update/",
  PROJECT_BY_ID: "Project/",
  PROJECT_DELETE: "Project/Delete/",

  // PURCHARSE MODULE
  LIST_PURCHARSES: "Purcharse",
  PURCHARSE_BY_ID: "Purcharse/",
  PURCHARSE_REGISTER: "Purcharse/Create/",
  PURCHARSE_CANCEL: "Purcharse/Delete/",

  // QUOTE MODULE
  LIST_QUOTES: "Quote",
  QUOTE_BY_ID: "Quote/",
  LIST_SELECT_QUOTE: "Quote/Select",
  QUOTE_REGISTER: "Quote/Create/",
  QUOTE_CANCEL: "Quote/Delete/",
  QUOTE_EDIT: "Quote/Update/",

  // REPORT MODULE
  DOWNLOAD_REPORT: "Report/Download/",
  SEND_REPORT: "Report/SendEmail/",
  VIEW_REPORT: "Report/ViewPdf/",

  // SALE MODULE
  LIST_SALES: "Sale",
  SALE_BY_ID: "Sale/",
  LIST_SELECT_SALES: "Sale/Select",
  SALE_REGISTER: "Sale/Create/",
  SALE_CANCEL: "Sale/Delete/",
  SALE_EDIT: "Sale/Update",

  // STATUS MODULE
  LIST_STATUSES: "Status",
  LIST_SELECT_STATUSES: "Status/Select",
  STATUS_REGISTER: "Status/Create/",
  STATUS_EDIT: "Status/Update/",
  STATUS_BY_ID: "Status/",
  STATUS_DELETE: "Status/Delete/",

  // SUPPLIER MODULE
  LIST_SUPPLIERS: "Supplier",
  LIST_SELECT_SUPPLIERS: "Supplier/Select",
  SUPPLIER_REGISTER: "Supplier/Create/",
  SUPPLIER_EDIT: "Supplier/Update/",
  SUPPLIER_BY_ID: "Supplier/",
  SUPPLIER_DELETE: "Supplier/Delete/",

  // TEMPLATE_TYPE MODULE
  LIST_TEMPLATE_TYPES: "TemplateType",
  LIST_SELECT_TEMPLATE_TYPES: "TemplateType/Select",
  TEMPLATE_TYPE_REGISTER: "TemplateType/Create/",
  TEMPLATE_TYPE_EDIT: "TemplateType/Update/",
  TEMPLATE_TYPE_BY_ID: "TemplateType/",
  TEMPLATE_TYPE_DELETE: "TemplateType/Delete/",

  // UNIT MODULE
  LIST_UNITS: "Unit",
  LIST_SELECT_UNITS: "Unit/Select",
  UNIT_REGISTER: "Unit/Create/",
  UNIT_EDIT: "Unit/Update/",
  UNIT_BY_ID: "Unit/",
  UNIT_DELETE: "Unit/Delete/",

  // USER MODULE
  LIST_USERS: "User",
  LIST_SELECT_USERS: "User/Select",
  USER_REGISTER: "User/Create/",
  USER_EDIT: "User/Update/",
  USER_BY_ID: "User/",
  USER_DELETE: "User/Delete/",

  // VOUCHER_TYPE MODULE
  LIST_VOUCHER_TYPES: "VoucherType",
  LIST_SELECT_VOUCHER_TYPES: "VoucherType/Select",
  VOUCHER_TYPE_REGISTER: "VoucherType/Create/",
  VOUCHER_TYPE_EDIT: "VoucherType/Update/",
  VOUCHER_TYPE_BY_ID: "VoucherType/",
  VOUCHER_TYPE_DELETE: "VoucherType/Delete/",
};

export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
