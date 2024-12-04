import { fetchWrapper } from "@/utils/fetch.wrapper.js";

const addSchedule = (data) => {
    return fetchWrapper.POST('/schedule',data);
}

const getSchedules = (page) => {
    return fetchWrapper.GET(`/schedule/list?page=${page}`);
}

const ScheduleService = {
    addSchedule,
    getSchedules,
}

export default ScheduleService;