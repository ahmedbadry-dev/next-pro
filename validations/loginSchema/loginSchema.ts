import { z } from 'zod'

const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'password is required' }),
})

type TLogin = z.infer<typeof loginSchema>

export { loginSchema, type TLogin }
