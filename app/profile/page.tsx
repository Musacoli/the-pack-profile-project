import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// Components
import ProfileForm from "@/components/profile-form";
import ProfileAvatar from "@/components/profile-avatar";
import { Button } from "@/components/ui/button";
import { Database } from '@/types/supabase'


export default async function Profile() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="grid gap-20 grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col space-y-10">
        <ProfileAvatar uid={session?.user?.id!} email={session?.user?.email!} />
        <form action="/auth/signout" method="post">
          <Button className="w-full" variant="outline" type="submit">
            Sign out
          </Button>
        </form>
      </div>
      <ProfileForm session={session} />
    </div>
  )
}

export const dynamic = 'force-dynamic'
