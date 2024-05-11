// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {ReactNode} from "react";
import File from "@/components/ui/file";
import {useFileMenu, useFiles} from "@/app/store";
import {cn} from "@/lib/utils";
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import z from 'zod';
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";

// Defining schema for new file form and type of it
const formSchema = z.object({fileName: z.string().min(3).max(20)})
type formType = z.infer<typeof formSchema>

// Creating and exporting file menu component as default
export default function FileMenu():ReactNode {
    // Defining react hook form
    const form = useForm<formType>({resolver: zodResolver(formSchema)})

    // Getting data of opened or closed from zustand store
    const {opened, activeFile, changeOpen, changeActive} = useFileMenu()

    // Getting data of files from zustand
    const {files, add} = useFiles();

    // Defining a function to handle submit of new file form
    const onSubmitHandler:SubmitHandler<formType> = ({fileName}) => {
        if (files.map(item => item.name).includes(fileName)) {
            form.setError('fileName', {
                message: 'The file name already exists',
            });
        } else {
            add(fileName, `<h1>${fileName}</h1>`);
            changeActive(fileName);
            toast('The file is added');
        }
    }

    // Returning JSX
    return (
        <div className={'h-full overflow-hidden flex flex-col'}>
            <div
                data-opened={opened}
                onClick={changeOpen}
                className={'lg:hidden block transition-all duration-500 data-[opened="false"]:opacity-0 data-[opened="true"]:opacity-100 data-[opened="false"]:pointer-events-none data-[opened="true"]:pointer-events-auto  w-full z-[40] h-full dark:bg-white/20 bg-black/20 backdrop-blur-2xl fixed top-0 left-0'}
            />
            <div
                className={cn(
                    (opened)
                        ? 'left-0 opacity-100 visible'
                        : 'left-[-75%] lg:opacity-100 opacity-0 lg:visible invisible',
                    'lg:backdrop-blur-2xl lg:dark:bg-black/20 lg:bg-white/20 dark:bg-black bg-white h-full lg:border-r lg:dark:border-r-white/20 lg:border-r-black/20 overflow-auto custom-scroll lg:static fixed top-0 lg:z-0 z-50 transition-all duration-500 lg:w-auto w-[75%]'
                )}
            >
                <Popover>
                    <PopoverTrigger asChild>
                        <div className={'p-1'}>
                            <Button size={'icon'} variant={'ghost'}>
                                <Plus className={'w-4 h-4'}/>
                            </Button>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Form {...form}>
                            <form action="#" onSubmit={form.handleSubmit(onSubmitHandler)}>
                                <FormField control={form.control} name={'fileName'} render={({field}) => (
                                    <FormItem>
                                        <FormLabel>File Name</FormLabel>
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
                {
                    (files.length === 0)
                        ? (
                            <div className={'p-[20px]'}>
                                <h1 className={'text-[20px] font-medium dark:text-white text-black text-center'}>There is nothing to show</h1>
                            </div>
                        ) : <ul className={'flex flex-col'}>
                            {
                                files.map((item ,index) => (
                                    <File
                                        key={index}
                                        name={item.name}
                                        content={item.content}
                                        active={item.name === activeFile}
                                    />
                                ))
                            }
                        </ul>
                }
            </div>
        </div>
    );
}