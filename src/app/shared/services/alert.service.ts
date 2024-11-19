import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor() {}

  success(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: "success",
      confirmButtonColor: "rgb(210, 155, 253)",
      width: 430,
    });
  }

  warn(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: "warning",
      confirmButtonColor: "rgb(210, 155, 253)",
      width: 430,
    });
  }

  error(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: "error",
      confirmButtonColor: "rgb(210, 155, 253)",
      width: 430,
    });
  }

  // Modificación de confirmación para manejar botones personalizados
  confirm(options: {
    title: string;
    message: string;
    buttons: Array<{ text: string; action: () => void }>;
  }): Promise<boolean> {
    return Swal.fire({
      title: options.title,
      text: options.message,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "rgb(210, 155, 253)",
      cancelButtonColor: "#d33",
      confirmButtonText: options.buttons[0]?.text, // El primer botón es el "Sí"
      cancelButtonText: options.buttons[1]?.text, // El segundo botón es el "No"
      width: 430,
    }).then((result) => {
      if (result.isConfirmed) {
        options.buttons[0]?.action(); // Ejecuta la acción del primer botón
        return true;
      } else {
        options.buttons[1]?.action(); // Ejecuta la acción del segundo botón
        return false;
      }
    });
  }
}
