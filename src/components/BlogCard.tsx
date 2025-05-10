import type { Blog } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { FormatDate } from "@/lib/formatDate"
import config from "@/config"
import { Link } from "react-router"
import { Badge } from "./ui/badge"

const BlogCard = ({ blog }: { blog: Blog }) => {
    return (
        <Card className="w-[350px] h-[400px] flex flex-col justify-between">
            <CardHeader>
                <div className="w-full h-[200px] border rounded-md overflow-hidden">
                    <img src={`${config.api.baseUrl}${blog.featured_image}`} alt="blog_image" className="w-full h-full object-cover rounded-lg" />
                </div>
                <Badge >{blog.category}</Badge>

                <CardTitle>
                    <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">

                        <p className="text-sm">{blog.author.username}</p>
                    </div>
                    <p className="text-sm opacity-50">{FormatDate(blog.published_at)}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default BlogCard