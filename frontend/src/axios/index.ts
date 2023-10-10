import axios, { AxiosError } from "axios";

interface IuserFetch {
    phone_number: string;
    birthday: string;
    first_name: string;
    last_name: string;
}
interface IpostUserProject {
    title: string;
    slogan: string;
    description: string;
    tags: string[];
}

interface IpostTemplate {
    name: string;
    background_color: string;
    text_color: string;
    text_align: string;
    scheme: string;
    background_type: string;
}

interface IpostModule {
    background_color: string;
    header_text: string;
    subheader_text: string;
    text_align: string;
    text_color: string;
}
export const axiosInstance = axios.create({
    baseURL: "https://practice-test.ru:8080",
});
//bullshit

//user
export async function getUserById(userId: string) {
    try {
        const { data: user } = await axiosInstance.get(
            `/user/${userId}`
        );
        return { user };
    } catch (err: any) {
        const status = (err as AxiosError).response?.status;
        return { status };
    }
}


export async function patchUserById(userId: string, fields: IuserFetch) {
    const { data } = await axiosInstance.patch(`/user/${userId}`, fields);
    return data;
}

export async function postUserById(userId: string, fields: IuserFetch) {
    const { data } = await axiosInstance.post(`/user/${userId}`, fields);
    return data;
}
//project
export async function getProjectById(projectId: string) {
    const { data } = await axiosInstance.get(`/project/${projectId}`);
    return data;
}

export async function deleteProjectById(projectId: string) {
    const { data } = await axiosInstance.delete(`/project/${projectId}`);
    return data;
}

export async function postProjectByUserId(
    userId: string,
    fields: IpostUserProject
) {
    const { data } = await axiosInstance.post(
        `/user/${userId}/project`,
        fields
    );
    return data;
}
//template
export async function getTemplateById(templateId: string) {
    const { data } = await axiosInstance.get(`/template/${templateId}`);
    return data;
}
export async function postTemplateById(
    projectId: string,
    fields: IpostTemplate
) {
    const { data } = await axiosInstance.post(
        `/project/${projectId}/template`,
        fields
    );
    return data;
}
export async function deleteTemplateById(templateId: string) {
    const { data } = await axiosInstance.delete(`/template/${templateId}/`);
    return data;
}
export async function patchTemplateById(templateId: string, fields: any) {
    const { data } = await axiosInstance.patch(
        `/template/${templateId}`,
        fields
    );
    return data;
}
export async function postTemplateImg(templateId: string, formData: any) {
    debugger;
    const { data } = await axiosInstance.post(
        `/template/${templateId}/image`,
        formData
    );
    return data;
}
//module

export async function postModuleById(templateId: string, fields: IpostModule) {
    const { data } = await axiosInstance.post(
        `/template/${templateId}/module`,
        fields
    );
    return data;
}
export async function patchModuleById(moduleId: string, fields: IpostModule) {
    const { data } = await axiosInstance.patch(`/module/${moduleId}`, fields);
    return data;
}
export async function getModuleById(moduleId: string) {
    const { data } = await axiosInstance.get(`/module/${moduleId}`);
    return data;
}
export const userId = "string";
