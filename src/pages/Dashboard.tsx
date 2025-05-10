import BlogsList from "@/components/BlogsList";
import PagePagination from "@/components/PagePagination";
import { getBlogs } from "@/services/apiBlog"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useState } from "react";

const Dashboard = () => {

  const [page, setPage] = useState<number>(1)
  const numOfBlogsPerPage = 3

  const { isPending, data, error } = useQuery({
    queryKey: ['blogs', page],
    queryFn: () => getBlogs(page),
    placeholderData: keepPreviousData
  })

  console.log(data);

  const blogs = data?.results || []

  const numberOgPages = Math.ceil(data?.count / numOfBlogsPerPage)

  function handleSetPage(val: number) {
    setPage(val)
  }

  function increasePage() {
    setPage(curr => curr + 1)
  }

  function decreasePage() {
    setPage(curr => curr - 1)
  }

  return (
    <>
      <BlogsList isPending={isPending} blogs={blogs} error={error} />
      <PagePagination numOfPages={numberOgPages} handleSetPage={handleSetPage} page={page} decreasePage={decreasePage} increasePage={increasePage} />
    </>
  )
}

export default Dashboard