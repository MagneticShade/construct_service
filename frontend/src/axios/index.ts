import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://practice-test.ru:8080",
});

export async function getTemplates() {
    const { data } = await axiosInstance.get(`/api/templates`);
    return data;
}
export async function getProjects() {
    const { data } = await axiosInstance.get(`/api/project/own/${userId}`)
    return data;
}

export const userId = "6502ddb2da26ac1f533b05be";