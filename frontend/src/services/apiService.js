import axios from "axios";

class ApiService {
    api;
    constructor() {
        this.api = axios.create({
            baseURL: "https://task-management-mern-ylmj.onrender.com",
            headers: {
                "Content-Type": "application/json"
            },
        })

        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem("token");
            if(token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config;
        }, (error) => Promise.reject(error))

        this.api.interceptors.response.use((response) => response, (error) => {
            if(error.response?.status === 401) {
                this.logout();
            }
            console.log(error.response)
            let msg = "Something went wrong";
            if(error.response?.data?.msg) {
                msg = error.response.data.msg;
            }
            error.message = msg;
            return Promise.reject(error);
        })

    };
    async login(email, password) {
        const response = await this.api.post("/api/v1/user/login", {email, password});
        const {token} = response;
        localStorage.setItem("token", token);
        return response.data;
    }
    async register(fullName, email, password) {
        const response = await this.api.post("/api/v1/user/register", {fullName, email, password});
        const {token} = response;
        localStorage.setItem("token", token);
        return response.data;
    }
    logout() {
        localStorage.removeItem("token");
    };
    async listTask(pageNumber, limit) {
        const response = await this.api.get(`/api/v1/task/getTaskList?pageNumber=${pageNumber}&limit=${limit}`);
        return response;
    }
    async getTask(id) {
        const response = await this.api.get(`/api/v1/task/getTask/${id}`);
        return response;
    }
    async createTask(payload) {
        console.log("getting payload", payload)
        const response = await this.api.post(`/api/v1/task/createTask`, payload);
        return response;
    }
    async markComplete(id) {
        const response = await this.api.patch(`/api/v1/task/markComplete/${id}`);
        return response;
    }
    async deleteTask(id) {
        const response = await this.api.delete(`/api/v1/task/deleteTask/${id}`);
        return response;
    }
    async updateTask(id, payload) {
        const response = await this.api.put(`/api/v1/task/updateTask/${id}`, payload);
        return response;
    }
}

const apiService = new ApiService();

export default apiService;