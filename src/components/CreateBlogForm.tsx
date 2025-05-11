import { blogSchema, type BlogFormValues } from "@/lib/Schema"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "./ui/textarea"
import { Select, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectGroup } from "./ui/select"
import { createBlog } from "@/services/apiBlog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"

const CreateBlogForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const form = useForm<BlogFormValues>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            content: "",
            featured_image: undefined,
            category: "",
            is_draft: false,
        },
    })

    const { setValue } = form

    const mutation = useMutation({
        mutationFn: (values: BlogFormValues) => createBlog(values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            navigate("/");
            toast.success("Blog created successfully!");
            console.log("Your post has been updated successfully!");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    async function onSubmit(values: BlogFormValues) {
        setIsLoading(true)

        try {
            mutation.mutate(values)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)

        }
    }

    return (
        <Card className="w-full max-w-[700px] mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Create a Blog post</CardTitle>
                <CardDescription>
                    Create a new blog post and share with the world
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            className=""
                                            placeholder="Blog Title"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Blog Content" className="min-h-[200px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="featured_image"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Blog Image</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="featured_image"
                                            control={form.control}
                                            render={({ field }) => (
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];  // Grab the file
                                                        if (file) {
                                                            field.onChange(file);  // Pass the file to react-hook-form
                                                        }
                                                    }}
                                                // No need for 'value' here, react-hook-form will manage it internally
                                                />
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            onValueChange={(value) => setValue("category", value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Categories</SelectLabel>
                                                    <SelectItem value="Technology">Technology</SelectItem>
                                                    <SelectItem value="Politics">Politics</SelectItem>
                                                    <SelectItem value="Business">Business</SelectItem>
                                                    <SelectItem value="Economy">Economy</SelectItem>
                                                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Creating..." : "Create Blog"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card >
    )
}


export default CreateBlogForm