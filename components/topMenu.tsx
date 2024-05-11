// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode, useEffect} from "react";
import {Menubar, MenubarMenu} from "@/components/ui/menubar"
import {Button, buttonVariants} from "@/components/ui/button";
import {Sun, Moon, AlignJustify, LoaderCircle, LogOut} from "lucide-react";
import {useFileMenu, useFiles, useTheme} from "@/app/store";
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import z from 'zod';
import {SubmitHandler, useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';
import useFirebase from "@/hooks/useFirebase";
import {cn} from "@/lib/utils";
import useUser from "@/hooks/useUser";

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
export default function TopMenu():ReactNode {
    // Defining states of component
    const {theme, changeTheme} = useTheme();
    const {changeOpen} = useFileMenu();
    const {files} = useFiles();

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
    const app = useFirebase();
    const user = useUser();

    // Handling submit events
    const loginFormSubmit:SubmitHandler<loginFormType> = ({email, password}) => {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((data) => {if (data) {window.location.reload();}})
            .catch(() => {
                loginForm.setError('root', {
                    message: 'There was an error while submiting the data. Please try again.'
                })
            })
    }

    const signupFormSubmit:SubmitHandler<signupFormType> = ({email, password, passwordRepeat}) => {
        if (password !== passwordRepeat) {
            signupForm.setError('root', {
                message: 'The password and its repeat are not matching'
            })
        } else {
            const auth = getAuth();

            createUserWithEmailAndPassword(auth, email, password)
                .then((data) => {
                    if (data) {
                        const db = getDatabase();
                        const dbRef = ref(db, `/${data.user.uid}`);

                        set(dbRef, files);
                    }
                })
                .catch(() => {
                    signupForm.setError('root', {
                        message: 'There was an error while submiting the data. Please try again.'
                    })
                })
        }
    }

    // Returning JSX
    return (
        <Menubar className={'shrink-0'}>
            <MenubarMenu>
                {
                    (user.loading)
                        ? (
                            <div className={cn(buttonVariants({variant: "ghost", size: 'icon'}), 'h-[2rem]')}>
                                <LoaderCircle className={'w-4 h-4 animate-spin'} color={'currentColor'}/>
                            </div>
                        ) : (user.user)
                            ? (
                                <Button size={'icon'} variant={'destructive'} className={'h-[2rem]'} onClick={() => getAuth().signOut()}>
                                    <LogOut className={'w-4 h-4'} color={'currentColor'} />
                                </Button>
                            ) : (
                                <Dialog modal>
                                    <DialogTrigger className={cn(buttonVariants({variant: "ghost"}), 'h-[2rem]')}>
                                        Auth
                                    </DialogTrigger>
                                    <DialogContent>
                                        <Tabs defaultValue="account" className="w-[400px]">
                                            <TabsList className="grid w-full grid-cols-2">
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
                                                        <Button disabled={loginForm.formState.isSubmitting} type={'submit'} className={'w-full mt-[20px]'}>Submit</Button>
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
                                                        <Button type={'submit'} className={'w-full mt-[20px]'}>Submit</Button>
                                                    </form>
                                                </Form>
                                            </TabsContent>
                                        </Tabs>
                                    </DialogContent>
                                </Dialog>
                            )
                }
            </MenubarMenu>
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