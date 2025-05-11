import api from "@/lib/api";
import type { BlogFormValues, LoginFormValues, RegisterFormValues } from "@/lib/Schema";
import type { Userdata } from "@/lib/types";
import { isAxiosError } from "axios";

export async function getBlogs(page: number) {
    try {
        const response = await api.get(`api/list_blogs?page=${page}`)

        return response.data
    } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch blogs')
    }
}

export async function getBlog(slug: string) {
    try {
        console.log(slug)
        const response = await api.get(`api/blogs/${slug}`)
        console.log(response)

        return response.data
    } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch blog')
    }
}

export async function signin(data: LoginFormValues) {
    try {
        const response = await api.post(`token/`, data)
        return response.data
    } catch (error) {
        console.error(error)
        if (isAxiosError(error) && error.response?.status === 400) {
            throw new Error("Failed to login")
        }
        if (isAxiosError(error) && error.response?.status === 401) {
            throw new Error("Invalid credentials")
        }
        throw new Error('Failed to login')
    }
}

export async function registerUser(data: RegisterFormValues) {
    try {
        const response = await api.post(`api/register/`, data)
        return response.data
    } catch (error) {
        console.error(error)
        if (isAxiosError(error) && error.response?.status === 400) {
            throw new Error("User already exists")
        }
        throw new Error('Failed to register user')
    }
}

export async function createBlog(data: BlogFormValues) {
    const token = localStorage.getItem('access')
    try {
        const response = await api.post(`api/create_blog/`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        })
        return response.data
    } catch (error) {
        console.error(error)
        if (isAxiosError(error) && error.response?.status === 400) {
            throw new Error("Failed to create blog")
        }
        throw new Error('Failed to create blog')
    }
}

export async function updateBlog(data: BlogFormValues, id: number) {
    try {
        const response = await api.put(`api/update_blog/${id}`, data)
        return response.data
    } catch (error) {
        console.error(error)
        if (isAxiosError(error) && error.response?.status === 400) {
            throw new Error("Failed to update blog")
        }
        throw new Error('Failed to update blog')
    }
}

export async function deleteBlog(id: number) {
    try {
        const response = await api.delete(`api/delete_blog/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
        if (isAxiosError(error) && error.response?.status === 400) {
            throw new Error("Failed to delete blog")
        }
        throw new Error('Failed to delete blog')
    }
}

export async function getUsername() {
    const token = localStorage.getItem('access')
    try {
        const response = await api.get("api/get_username", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error)
        if (isAxiosError(error) && error.response?.status === 400) {
            throw new Error("Failed to get username")
        }
        throw new Error('Failed to get username')
    }
}

export async function getUserInfo(username: string) {
    const token = localStorage.getItem('access')

    try {
        const response = await api.get(`api/get_userinfo/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error)
        if (isAxiosError(error) && error.response?.status === 400) {
            throw new Error("Failed to get user info")
        }
        throw new Error('Failed to get user info')
    }
}

export async function updateProfile(data: Userdata) {
    try {
        const response = await api.put(`api/update_profile/`, data, { withCredentials: true })
        return response.data
    } catch (error) {
        console.error(error)
        if (isAxiosError(error) && error.response?.status === 400) {
            throw new Error("Failed to update profile")
        }
        throw new Error('Failed to update profile')
    }
}