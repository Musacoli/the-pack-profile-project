'use client'

import { useCallback, useEffect, useState } from "react";
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs'
import toast from "react-hot-toast";

// Components
import ProfileAvatar from "@/components/profile-avatar";
import ProfileForm from "@/components/profile-form";
import { Button } from "@/components/ui/button";

// Types
import { Database } from "@/types/supabase";
type Profiles = Database['public']['Tables']['profiles']['Row']

export default function ProfileSection({ session }: { session: Session | null }) {

  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Partial<Profiles> | null>(null)
  const supabase = createClientComponentClient<Database>()

  const user = session?.user
  const { id, email } = user!

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`first_name, last_name, username, bio, avatar_url`)
        .eq('id', user?.id!)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setProfile(data)
      }
    } catch (error) {
      toast.error('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [supabase, user?.id])

  useEffect(() => {
    void getProfile()
  }, [user, getProfile])

  return (
    <div className="grid gap-20 grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col space-y-10">
        <ProfileAvatar uid={id} email={email!} url={profile?.avatar_url as string} />
        <form action="/auth/signout" method="post">
          <Button className="w-full" variant="outline" type="submit">
            Sign out
          </Button>
        </form>
      </div>
      <ProfileForm uid={id} profile={profile} />
    </div>
  )
}
