'use client'

import * as z from "zod";

import {useEffect, useState} from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast";

// Components
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";

// Utils
import { profileFormSchema } from "@/lib/formSchemas/profileForm";
import { Database } from "@/types/supabase";

// Types
type Profiles = Database['public']['Tables']['profiles']['Row']

export default function ProfileForm({ uid, profile }: { uid: string | null, profile: Partial<Profiles> | null }) {

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema)
  })

  useEffect(() => {
    if (profile) {
      form.setValue('firstName', profile.first_name || '')
      form.setValue('lastName', profile.last_name || '')
      form.setValue('username', profile.username || '')
      form.setValue('bio', profile.bio || '')
    }
  }, [form, profile, uid]);

  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: z.infer<typeof profileFormSchema>) => {

    const { firstName, lastName, username, bio } = values

    try {
      setLoading(true)

      let { error } = await supabase.from('profiles').upsert({
        id: uid as string,
        username,
        first_name: firstName,
        last_name: lastName,
        bio,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      toast.success('Profile updated!')
    } catch (error) {
      toast.error('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First name" disabled={loading} {...field} />
              </FormControl>
              <FormDescription>
                This is how your name will be displayed in the app.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last name" disabled={loading} {...field}  />
              </FormControl>
              <FormDescription>
                This is how your last name will be displayed in the app.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" disabled={loading} {...field} />
              </FormControl>
              <FormDescription>
                This is how your username will be displayed in the app.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can go all out and share your story with us.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={loading} type="submit">
          {loading && <Loader2 className="animate-spin" size={16} />}
          Update
        </Button>
      </form>
    </Form>
  )


}
