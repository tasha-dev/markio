// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from 'react';
import {fileType} from "@/types";
import {File as FileIcon, Pencil, X} from 'lucide-react';
import {useFileMenu, useFiles} from "@/app/store";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {SubmitHandler, useForm} from "react-hook-form";
import z from "zod";
import {toast} from "sonner";
import {zodResolver} from "@hookform/resolvers/zod";
import useFirebase from "@/hook/useFirebase";
import useFirebaseFiles from "@/hook/useFirebaseFiles";
import {getDatabase, ref, set} from "@firebase/database";

// Defining schema for file rename form and type of it
const formSchema = z.object({fileName: z.string().min(3).max(20)})
type formType = z.infer<typeof formSchema>

// Creating and exporting file component as default
export default function File({name, user, active = false, index}:fileType):ReactNode {
    // Defining react hook form
    const form = useForm<formType>({resolver: zodResolver(formSchema)})

    // Getting state of menu
    const {changeActive} = useFileMenu();
    const {remove, rename, files} = useFiles()

    // Defining firebase
    const firebase = useFirebase();
    const firebaseFiles = useFirebaseFiles({user});

    // Defining a function to handle submit of rename file form
    const onSubmitHandler:SubmitHandler<formType> = ({fileName}) => {
        if (files.map(item => item.name).includes(fileName)) {
            form.setError('fileName', {
                message: 'The file name already exists',
            });
        } else {
            rename(name, fileName);
            changeActive(fileName);
            toast('The file name is changed');

            if (user.user) {
                const firebaseNames = Object.keys(firebaseFiles);
                const firebaseName = firebaseNames[index];

                const db = getDatabase();
                const dbRef = ref(db, `/${user.user.uid}/${firebaseName}/name`);

                set(dbRef, fileName);
            }
        }
    }

    // Returning JSX
    return (
        <li
            data-active={active}
            className={'w-full flex items-center transition-all duration-500 justify-between group dark:data-[active="true"]:bg-white/20 data-[active="true"]:bg-black/20'}
        >
            <button
                onClick={() => changeActive(name)}
                className={'flex w-full items-center overflow-hidden gap-[10px] px-[12px] py-[10px] transition-all duration-500 dark:text-white text-black'}
            >
                <FileIcon className={'w-4 h-4'} color={'currentColor'} />
                <span className={"text-sm text-start font-medium w-full leading-none truncate text-current"}>{name}</span>
            </button>
            {
                (name.toLowerCase() !== 'welcome')
                    ? (
                        <div className={'flex shrink-0'}>
                            <button
                                onClick={() => {
                                    remove(name);

                                    if (user.user) {
                                        const firebaseNames = Object.keys(firebaseFiles);
                                        const firebaseName = firebaseNames[index];

                                        const db = getDatabase();
                                        const dbRef = ref(db, `/${user.user.uid}/${firebaseName}`);

                                        set(dbRef, {});
                                    }
                                }}
                                className={'h-[36px] w-[36px] aspect-square flex items-center justify-center transition-all duration-500 bg-transparent text-red-600 hover:bg-red-600 hover:text-white'}
                            >
                                <X className={'w-4 h-4'}/>
                            </button>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button
                                        className={'h-[36px] w-[36px] aspect-square flex items-center justify-center transition-all duration-500 dark:text-white text-black dark:hover:bg-white/20 hover:bg-black/20'}
                                    >
                                        <Pencil className={'w-4 h-4'}/>
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Form {...form}>
                                        <form action="#" onSubmit={form.handleSubmit(onSubmitHandler)}>
                                            <FormField control={form.control} name={'fileName'} render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>New File Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder={"Without .md extension at end"} {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}/>
                                            <Button type={'submit'} className={'w-full mt-[20px]'}>Create</Button>
                                        </form>
                                    </Form>
                                </PopoverContent>
                            </Popover>
                        </div>
                    ) : false
            }
        </li>
    );
}