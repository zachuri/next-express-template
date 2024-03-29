"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { env } from '@/env'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { useToast } from './ui/use-toast'

const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }).transform((s) => s.toLowerCase()),
    password: z.string()
    .min(8, { message: "Must be 8+ characters" })
    .max(32, { message: "Can't be longer than 32 characters" })
    .refine((value) => /[a-z]/.test(value), {
      message: "Must contain at least one lowercase letter",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Must contain at least one uppercase letter",
    })
    .refine((value) => /\d/.test(value), {
      message: "Must contain at least one digit",
    })
    .refine((value) => /[!@#$%^&*]/.test(value), {
      message: "Must contain at least one special character '!@#$%^&*'",
    }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

type FormSchema = z.infer<typeof formSchema>;

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(newUser: FormSchema) {
    const response = await axios.post(`${env.NEXT_PUBLIC_API_URL}/auth/register`, {
      email: newUser.email,
      password: newUser.password,
    });   

    if (response.status === 200 && response.data.success === true) {
      toast({
        title: "Successfully registered",
        description: "You are now able to login!"
      })

      router.push('/login');
    }

    console.log(response.data)

    if (response.status === 200 && response.data.success === false) {
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: 'destructive'
      })
    }
  }


  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your email below to register an account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input {...field} autoFocus inputMode="email" placeholder="m@example.com" value={field.value || ''} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verify Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormMessage />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              Sign up
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex flex-col gap-5'>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="hover:text-brand underline underline-offset-4"
          >
            Already have an account? Sign in 
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}