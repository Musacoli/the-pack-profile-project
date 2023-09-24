'use client'

import md5 from 'md5'
import React, {useState} from "react";
import toast from 'react-hot-toast';

import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {Database} from "@/types/supabase";

// Components
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Input} from "@/components/ui/input"
import {cn} from "@/lib/utils";

type Profiles = Database['public']['Tables']['profiles']['Row']


export default function ProfileAvatar ({
  uid,
  email,
}: {
  uid: string
  email: string
}) {
  const supabase = createClientComponentClient<Database>()

  const [uploading, setUploading] = useState(false)
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null)

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      // check if a file is selected
      if (!event.target.files || event.target.files.length === 0) {
        toast.error("You must select an image to upload.")
        return;
      }

      // get the first file selected
      const file = event.target.files[0]

      const fileExt = file.name.split('.').pop()
      const fileName = `${new Date()}.${fileExt}`
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      let {data, error: uploadError} = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      console.log("data", data)

      if (uploadError) {
        console.log("uploadError", uploadError)
        toast.error(`Failed to upload image: ${uploadError}`)
      }

      // create a storage ref
      const avatarUrl = URL.createObjectURL(file)

      setAvatarSrc(avatarUrl)

    } catch (error) {
      toast.error(`Failed to upload avatar: ${error}`)
      console.log(error)
    } finally {
      setUploading(false)
    }
  }


  return (
    <Avatar className={cn("group w-[300px] h-[300px] lg:w-[500px] lg:h-[500px]", uploading && "animate-pulse")}>
      <Input type="file" accept="image/*" onChange={uploadAvatar}
             className="hidden group-hover:flex group-hover:cursor-pointer items-center justify-center opacity-30 w-full h-full absolute"/>
      <AvatarImage src={avatarSrc || `https://www.gravatar.com/avatar/${md5(email)}?s=300`} />
    </Avatar>

  )
}
