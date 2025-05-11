import type { Userdata } from "@/lib/types"
import { getUserInfo } from "@/services/apiBlog"
import { Icon } from "@iconify/react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

const Profile = ({ username }: { username: string | null}) => {
    const [user, setUser] = useState<Userdata | null>(null)

  const { data } = useQuery({
    queryKey: ['user', username],
    queryFn: () => getUserInfo(username as string),
  })

  useEffect(() => {
    if (data) {
      setUser(data)
      console.log(data)
    }
  }, [data])

  return data ? (
    <div>
      {user && (
        <div>
          <h1>{user.username}</h1>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  ) : <Icon icon="codex:loader" className="w-24 h-24" />
}

export default Profile