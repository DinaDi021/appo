import { urls } from "../constants";
import {
  IAvailableMasterResponse,
  IUpdateSchedulesParams,
} from "../interfaces";
import {
  IAddSchedule,
  ISchedule,
  ISchedulesResponse,
} from "../interfaces/scheduleInterface";
import { apiService, IRes } from "./apiServices";

const schedulesService = {
  availableSchedules: (
    date: string[],
    service_id: number[],
    category: string[],
    master_id: number,
  ): IRes<IAvailableMasterResponse> =>
    apiService.get(urls.schedules.availableSchedules, {
      params: {
        filter: {
          date: date,
          service_id: service_id,
          category: category,
          master_id: master_id,
        },
      },
    }),
  getAllUsersSchedules: (userId: number): IRes<ISchedulesResponse> =>
    apiService.get(urls.schedules.usersAll(userId)),
  getSchedule: (userId: number, scheduleId: number): IRes<ISchedule> =>
    apiService.get(urls.schedules.byId(userId, scheduleId)),
  addSchedule: (userdId: number, data: IAddSchedule): IRes<ISchedule> =>
    apiService.post(urls.schedules.usersAll(userdId), data),
  deleteSchedule: (userId: number, scheduleId: number): IRes<void> =>
    apiService.delete(urls.schedules.byId(userId, scheduleId)),
  updateSchedule: (
    userId: number,
    scheduleId: number,
    params: IUpdateSchedulesParams,
  ): IRes<ISchedule> =>
    apiService.patch(urls.schedules.byId(userId, scheduleId), params),
};

export { schedulesService };
