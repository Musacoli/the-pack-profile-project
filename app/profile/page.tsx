import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// Components
import ProfileSection from "@/components/profile-section";

// Types
import { Database } from '@/types/supabase'


export default async function Profile() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return <ProfileSection session={session} />
}

export const dynamic = 'force-dynamic'
