import * as z from "zod"

export const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters long",
  }).max(50, {
    message: "First name must be at most 50 characters long",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters long",
  }).max(50, {
    message: "Last name must be at most 50 characters long",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  bio: z.string().max(160, {
    message: "Bio must be at most 160 characters long",
  })
})
