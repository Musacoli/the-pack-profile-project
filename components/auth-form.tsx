'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeMinimal } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/supabase'

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>()

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeMinimal }}
      theme="dark"
      showLinks={false}
      providers={[]}
      redirectTo={process.env.NEXT_PUBLIC_AUTH_URL}
    />
  )
}
