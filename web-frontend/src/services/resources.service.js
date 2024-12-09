import {fetchWrapper} from "@/utils/fetch.wrapper.js";

const addResource = (data) => {
    return fetchWrapper.POST('/resource', data);
}

const getResources = (page) => {
    return fetchWrapper.GET(`/resource/list?page=${page}`);
}

const getResource = (id) => {
    return fetchWrapper.GET(`/resource/${id}`);
}

const ResourcesService = {
    addResource,
    getResources,
    getResource,
}

export default ResourcesService;