'use client'
import React, {useState} from 'react';
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {LoaderCircle} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {useToast} from '@/hooks/use-toast';
import {PasswordInput} from '@/components/ui/password-input';


const formSchema = z.object({
    password: z.string(),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "The passwords must match.",
    path: ["confirmPassword"], // This sets which field the error is attached to
});

type ResetPasswordFormValue = z.infer<typeof formSchema>;

interface ResetPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

const ResetPasswordForm = ({className, ...props}: ResetPasswordFormProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const form = useForm<ResetPasswordFormValue>({
        resolver: zodResolver(formSchema),
    });
    const {toast} = useToast()
    const onSubmit = async (data: ResetPasswordFormValue) => {
        //forgot password
        setIsLoading(true)
        console.log("submit")
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({password: data.password}),
        })

        setIsLoading(false)
        if (response.ok) {
            return toast({
                title: "Check your email",
                description: "We sent you a login link. Be sure to check your spam too.",
            })
        }

        return toast({
            description: 'Error, please try again.',
        })


    };

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <PasswordInput {...field}/>
                                </FormControl>
                                <FormDescription/>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <PasswordInput {...field}
                                    />
                                </FormControl>
                                <FormDescription/>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button disabled={isLoading} className="ml-auto w-full" type="submit">
                        {isLoading && (
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        Reset Password
                    </Button>
                </form>
            </Form>
        </div>);
};

export default ResetPasswordForm;