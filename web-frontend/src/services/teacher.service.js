import { fetchWrapper } from "@/utils/fetch.wrapper.js";

const addTeacher = (data) => {
    return fetchWrapper.POST('/teacher',data);
}

const getTeachers = (page) => {
    return fetchWrapper.GET(`/teacher?page=${page}`);
}

const TeacherService = {
    addTeacher,
    getTeachers,
}

export default TeacherService;