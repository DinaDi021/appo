import { urls } from "../constants";
import { IAppointment } from "../interfaces";
import { apiService, IRes } from "./apiServices";

const appointmentsService = {
  getAllAppointments: (userId: number): IRes<IAppointment> =>
    apiService.get(urls.appointments.all(userId)),
  getAppointment: (userId: number, appointmentId: number): IRes<IAppointment> =>
    apiService.get(urls.appointments.byId(userId, appointmentId)),
  deleteAppointment: (userId: number, appointmentId: number): IRes<void> =>
    apiService.delete(urls.appointments.byId(userId, appointmentId)),
};

export { appointmentsService };
