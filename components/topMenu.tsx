// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode, useEffect} from "react";
import {Menubar, MenubarMenu} from "@/components/ui/menubar"
import {Button} from "@/components/ui/button";
import {Sun, Moon, AlignJustify, LoaderCircle} from "lucide-react";
import {useFileMenu, useTheme} from "@/app/store";
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import z from 'zod';
import {SubmitHandler, useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {topMenuType} from "@/types";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import useFirebase from "@/hook/useFirebase";
import Find from '@/components/find';

// Defining types and schemas of forms
const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(12),
})

const signupFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(12),
    passwordRepeat: z.string().min(8).max(12),
})

type loginFormType = z.infer<typeof loginFormSchema>;
type signupFormType = z.infer<typeof signupFormSchema>;

// Creating and exporting top side menu as default
export default function TopMenu({user}:topMenuType):ReactNode {
    // Defining states of component
    const {theme, changeTheme} = useTheme();
    const {changeOpen} = useFileMenu();

    // Defining form hook
    const loginForm = useForm<loginFormType>({resolver: zodResolver(loginFormSchema)})
    const signupForm = useForm<signupFormType>({resolver: zodResolver(signupFormSchema)})

    // Using useEffect to add dark/light class names to html element
    useEffect(() => {
        const htmlElement = document.documentElement;
        (theme === 'dark')
            ? htmlElement.classList.add('dark')
            : htmlElement.classList.remove('dark')
    }, [theme]);

    // Defining firebase
    const firebase = useFirebase();

    // Handling submit events
    const loginFormSubmit:SubmitHandler<loginFormType> = async ({email, password}) => {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => window.location.reload())
            .catch(() => loginForm.setError('root', {message: 'There was an error while logging in. Please try again'}))
    }

    const signupFormSubmit:SubmitHandler<signupFormType> = async ({email, password, passwordRepeat}) => {
        if (password !== passwordRepeat) {
            signupForm.setError('root', {
                message: 'The password and its repeat are not matching'
            })
        } else {
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => window.location.reload())
                .catch(() => loginForm.setError('root', {message: 'There was an error while creating new user. Please try again'}))
        }
    }

    // Returning JSX
    return (
        <Menubar className={'shrink-0'}>
            {
                (user.loading)
                    ? (
                        <div className={'h-[2rem] flex items-center justify-center w-[2rem] aspect-square'}>
                            <LoaderCircle className={'w-4 h-4 animate-spin'} />
                        </div>
                    ) : (user.user)
                        ? <Button className={'h-[2rem]'} variant={'destructive'} onClick={() => {
                            const auth = getAuth();

                            auth.signOut();
                            window.location.reload();
                        }}>Log out</Button>
                        : (
                            <MenubarMenu>
                                <Dialog modal>
                                    <DialogTrigger>
                                        <Button variant={'ghost'} className={'h-[2rem]'}>Auth</Button>
                                    </DialogTrigger>
                                    <DialogContent className={'lg:max-w-lg max-w-full lg:h-auto h-dvh lg:overflow-hidden overflow-auto lg:rounded-md rounded-0 lg:border border-0'}>
                                        <Tabs defaultValue="account" className="lg:w-[400px] w-full">
                                            <TabsList className="grid w-full lg:grid-cols-2 grid-cols-1 lg:h-[40px] h-auto">
                                                <TabsTrigger value="sign-in">Sign in</TabsTrigger>
                                                <TabsTrigger value="sign-up">Sign up</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="sign-in">
                                                <Form {...loginForm}>
                                                    <form
                                                        action="#"
                                                        onSubmit={loginForm.handleSubmit(loginFormSubmit)}
                                                        className={'flex flex-col gap-[20px]'}
                                                    >
                                                        <FormField control={loginForm.control} name={'email'} render={({field}) => (
                                                            <FormItem>
                                                                <FormLabel>Login</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder={"johndoe@gmail.com"} {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}/>
                                                        <FormField control={loginForm.control} name={'password'} render={({field}) => (
                                                            <FormItem>
                                                                <FormLabel>Password</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder={"12345678"} {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}/>
                                                        {loginForm.formState.errors.root?.message && <p className={'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive'}>{loginForm.formState.errors.root?.message}</p>}
                                                        <Button type={'submit'} className={'w-full mt-[20px]'} disabled={(loginForm.formState.isSubmitting)}>
                                                            {
                                                                (loginForm.formState.isSubmitting)
                                                                    ? (
                                                                        <>
                                                                            <LoaderCircle className={'w-4 h-4 mr-2 animate-spin'} />
                                                                            <span>Loading</span>
                                                                        </>
                                                                    )  : 'Login'
                                                            }
                                                        </Button>
                                                    </form>
                                                </Form>
                                            </TabsContent>
                                            <TabsContent value="sign-up">
                                                <Form {...signupForm}>
                                                    <form
                                                        action="#"
                                                        onSubmit={signupForm.handleSubmit(signupFormSubmit)}
                                                        className={'flex flex-col gap-[20px]'}
                                                    >
                                                        <FormField control={signupForm.control} name={'email'} render={({field}) => (
                                                            <FormItem>
                                                                <FormLabel>Login</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder={"johndoe@gmail.com"} {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}/>
                                                        <FormField control={signupForm.control} name={'password'} render={({field}) => (
                                                            <FormItem>
                                                                <FormLabel>Password</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder={"12345678"} {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}/>
                                                        <FormField control={signupForm.control} name={'passwordRepeat'} render={({field}) => (
                                                            <FormItem>
                                                                <FormLabel>Password Repeat</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder={"12345678"} {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}/>
                                                        {signupForm.formState.errors.root?.message && <p className={'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive'}>{signupForm.formState.errors.root?.message}</p>}
                                                        <Button type={'submit'} className={'w-full mt-[20px]'} disabled={(signupForm.formState.isSubmitting)}>
                                                            {
                                                                (signupForm.formState.isSubmitting)
                                                                    ? (
                                                                        <>
                                                                            <LoaderCircle className={'w-4 h-4 mr-2 animate-spin'} />
                                                                            <span>Loading</span>
                                                                        </>
                                                                    )  : 'Sign up'
                                                            }
                                                        </Button>
                                                    </form>
                                                </Form>
                                            </TabsContent>
                                        </Tabs>
                                    </DialogContent>
                                </Dialog>
                            </MenubarMenu>
                        )
            }
            <Find />
            <Button
                onClick={changeTheme}
                size={'icon'}
                variant={'ghost'}
                className={'h-[2rem]'}
            >
                {
                    (theme === 'dark')
                        ? <Sun className={'w-4 h-4'} color={'currentColor'} />
                        : <Moon className={'w-4 h-4'} color={'currentColor'} />
                }
            </Button>
            <Button
                onClick={changeOpen}
                size={'icon'}
                variant={'ghost'}
                className={'rounded-none lg:hidden flex'}
            >
                <AlignJustify className={'w-4 h-4'} color={'currentColor'} />
            </Button>
        </Menubar>
    );
}