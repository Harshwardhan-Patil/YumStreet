import backgroundImage from '@/assets/Temp/Hero-bg.avif';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Edit, MapPinIcon, User2, UserCircle2 } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Drawer } from 'vaul';


const background = {
    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.4) 0%, rgba(37,40,43,0.2) 100%),
        url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};

function UserProfile() {
    return (
        <section className="mx-12">
            <div style={background} className='flex justify-center items-center h-[50vh]'>
                <div className='px-4 flex justify-between w-full text-primary-foreground'>
                    <div className='flex gap-4 items-center'>
                        <Avatar className='w-28 h-28 bg-neutral-400 border-8 rounded-full border-white'>
                            <AvatarImage src='' />
                            <AvatarFallback><User2 className='w-full h-full border rounded-full border-neutral-500' /></AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className='text-lg font-semibold'>Harshwardhan Patil</h1>
                            <div className='flex items-center gap-0.5'>
                                <MapPinIcon className="w-5 stroke-neutral-300 fill-neutral-600" />
                                <span className='capitalize text-sm'>Kolhapur</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='pb-3 text-right'>
                            <EditProfile />
                        </div>
                        <div className='flex gap-6 justify-center items-center'>
                            <div className='text-center'>
                                <p>0</p>
                                <p>Reviews</p>
                            </div>
                            <Separator orientation="vertical" className='h-10' />
                            <div className='text-center'>
                                <p>0</p>
                                <p>Orders</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function EditProfile() {
    return (
        <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger asChild>
                <Button className='gap-2 bg-red-500 hover:bg-red-600 group'>
                    <Edit className='group-hover:-translate-x-1 transition' />
                    <span>Edit Profile</span>
                </Button>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className="bg-zinc-100 z-50 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
                    <div className="p-4 bg-white rounded-t-[10px] flex-1">
                        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                        <div className="m-section">
                            <Drawer.Title className="font-medium mb-4 text-2xl">
                                Edit Profile
                            </Drawer.Title>
                            <div></div>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}

export default UserProfile