import BlogWriter from "@/components/BlogWriter";
import { Badge } from "@/components/ui/badge";
import config from "@/config";
import { getBlog } from "@/services/apiBlog"
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"

const Blog = () => {
  const { slug } = useParams()

  console.log(slug)

  const { isPending, isError, error, data: blog } = useQuery({
    queryKey: ['blogs', slug],
    queryFn: () => getBlog(slug!)
  })

  if (error && isError) {
    console.log(error)
  }

  if (isPending) {
    return (
      <Icon icon="codex:loader" className="w-24 h-24" />
    )
  }

  return (
    <>
      <div className="padding-dx max-container py-9">
        <Badge>{blog?.category}</Badge>

        <div className="flex justify-between items-center gap-4">
          <h2 className="py-6 leading-normal text-2xl md:text-3xl text-[#181A2A] tracking-wide font-semibold dark:text-[#FFFFFF]">
            {blog?.title}
          </h2>
        </div>

        <BlogWriter blog={blog} />

        <div className="w-full h-[380px] my-9 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={`${config.api.baseUrl}${blog?.featured_image}`}
          />
        </div>


        <p className="text-[16px] leading-[2rem] text-justify text-[#3B3C4A] dark:text-[#BABABF]">
          {blog?.content}
        </p>

        {isError && <p>error getting blog</p>}
      </div>
    </>
  );
};


export default Blog