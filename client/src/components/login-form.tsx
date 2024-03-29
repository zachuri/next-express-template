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
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).transform((s) => s.toLowerCase()),
  password: z.string(),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async ({
    email,
    password,
  }: z.infer<typeof formSchema>) => {
    // Relies on middleware to redirect to dashbaord
    // onboarding checks if user has a phone number else go to dashboard
    await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: `${window.location.origin}/dashboard`,
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
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
                    {/* Provide initial value based on form's default value */}
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
                    {/* Provide initial value based on form's default value */}
                    <Input type="password" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormMessage />
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-full"
            >
              Log In
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex flex-col gap-5'>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}