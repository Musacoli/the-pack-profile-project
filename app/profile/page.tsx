import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// Components
import ProfileForm from "@/components/profile-form";
import { Button } from "@/components/ui/button";
import { Database } from '@/types/supabase'

export default async function Profile() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="grid gap-20 grid-cols-1">
      <ProfileForm session={session} />
      <div>
        <form action="/auth/signout" method="post">
          <Button type="submit">
            Sign out
          </Button>
        </form>
      </div>
    </div>
  )
}
