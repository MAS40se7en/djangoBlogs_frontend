import config from "@/config"
import { FormatDate } from "@/lib/formatDate"
import type { Blog } from "@/lib/types"
import { Link } from "react-router"

const BlogWriter = ({ blog }: { blog: Blog }) => {
    return (
        <Link to={`/profile/${blog?.author.username}`}>
            <div className="flex items-center gap-4">


                <span className="flex items-center gap-2">

                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                        <img
                            src={`${config.api.baseUrl}${blog.author.profile_image}`}
                            className="c rounded-full w-full h-full object-cover"
                        />
                    </div>

                    <small className="text-[#696A75] text-[14px]">
                        {blog?.author.first_name} {blog.author.last_name}
                    </small>
                </span>

                <small>
                    {FormatDate(blog.published_at)}
                </small>
            </div>
        </Link>
    )
}

export default BlogWriter