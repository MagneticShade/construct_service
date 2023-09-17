import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://194.26.138.180:8080",
});

export async function getTemplates() {
    const { data } = await axiosInstance.get(`/api/templates`);
    return data;
}
export const userId = "6502ddb2da26ac1f533b05be";