"use client"

// Components
import ProfileForm from "@/components/profile-form";
import { Button } from "@/components/ui/button";

export default function Profile() {
  return (
    <div className="grid gap-20 grid-cols-1">
      <ProfileForm />
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
