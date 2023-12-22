import { urls } from "../constants";
import { IUpdateSchedulesParams } from "../interfaces";
import { ISchedule, ISchedulesResponse } from "../interfaces/scheduleInterface";
import { apiService, IRes } from "./apiServices";

const schedulesService = {
  getAllUsersSchedules: (userId: number): IRes<ISchedulesResponse> =>
    apiService.get(urls.schedules.usersAll(userId)),
  getSchedule: (userId: number, scheduleId: number): IRes<ISchedule> =>
    apiService.get(urls.schedules.byId(userId, scheduleId)),
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
