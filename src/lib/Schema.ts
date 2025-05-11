import * as z from "zod"

export const loginSchema = z.object({
    username: z.string().min(6, { message: "username must be at least 6 characters long." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
})

export const registerSchema = z.object({
    username: z.string().min(6, { message: "username must be at least 6 characters long." }),
    first_name: z.string().min(2, { message: "First name must be at least 2 characters long." }),
    last_name: z.string().min(2, { message: "Last name must be at least 2 characters long." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long." }),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    })

export const blogSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters long." }),
    content: z.string().min(30, { message: "Content must be at least 30 characters long." }),
    featured_image: z.instanceof(File).refine(file => file.size > 0, {
    message: "Please upload a valid image file.",
  }),
    category: z.string({ message: "Please select a category." }),
    is_draft: z.boolean(),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
export type BlogFormValues = z.infer<typeof blogSchema>