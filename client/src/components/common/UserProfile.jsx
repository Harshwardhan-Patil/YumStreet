import backgroundImage from '@/assets/Temp/Hero-bg.avif';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Edit, MapPinIcon, User2 } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Drawer } from 'vaul';
import { route } from '@/constants';
import UserProfileSkeleton from '../Skeleton/UserProfileSkeleton';
import { Form, Formik } from 'formik';
import CustomInput from '../formik/CustomInput';
import { useRef, useState } from 'react';
import { useUpdateUserAvatar, useUpdateUserProfile, useUserProfile } from '@/lib/helpers/useUserQuery';
import { CameraIcon } from '@heroicons/react/24/solid';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import SpinLoader from '@/styles/SpinLoader';
import * as Yup from 'yup';
import DrawerPanel from '../ui/DrawerPanel';


const background = {
    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.4) 0%, rgba(37,40,43,0.2) 100%),
        url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};

function UserProfile() {
    const { data: user, isLoading, } = useUserProfile();
    return (
        isLoading
            ? <UserProfileSkeleton />
            : <section className="mx-12">
                <div style={background} className='flex justify-center items-center h-[50vh]'>
                    <div className='px-4 flex justify-between w-full text-primary-foreground'>
                        <div className='flex gap-4 items-center'>
                            <Avatar className='w-32 h-32 bg-neutral-400 border-4 rounded-full border-white'>
                                <AvatarImage src={user?.avatar.url || `${route.API}/${user?.avatar.localPath}`} />
                                <AvatarFallback><User2 className='w-full h-full border rounded-full border-neutral-500' /></AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className='text-lg font-semibold'>{`${user.firstname} ${user.lastname}`}</h1>
                                {user?.address?.city && <div className='flex items-center gap-0.5'>
                                    <MapPinIcon className="w-5 stroke-neutral-300 fill-neutral-600" />
                                    <span className='capitalize text-sm'>{user.address.city}</span>
                                </div>}
                            </div>
                        </div>
                        <div>
                            <div className='pb-3 text-right'>
                                <EditProfile user={user} />
                            </div>
                            <div className='flex gap-6 justify-center items-center'>
                                <div className='text-center'>
                                    <p>{user.reviews.length}</p>
                                    <p>Reviews</p>
                                </div>
                                <Separator orientation="vertical" className='h-10' />
                                <div className='text-center'>
                                    <p>{user.orders.length}</p>
                                    <p>Orders</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )
}

function EditProfile({ user }) {
    return (
        <DrawerPanel
            trigger={
                <Button className='gap-2 bg-red-500 hover:bg-red-600 group'>
                    <Edit className='group-hover:-translate-x-1 transition' />
                    <span>Edit Profile</span>
                </Button>
            }
            full
        >
            <Drawer.Title className="font-medium mb-4 text-2xl">
                Edit Profile
            </Drawer.Title>
            <EditProfileForm user={user} Close={Drawer.Close} />
        </DrawerPanel>
    )
}

const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
}

const profileValidationSchema = new Yup.ObjectSchema({
    firstname: Yup.string(),
    lastname: Yup.string(),
    email: Yup.string().email("Please enter a valid email address"),
    phoneNumber: Yup.string().matches(/^\+[1-9]\d{1,14}$/i, "Please enter a valid phone number"),
})

function EditProfileForm({ user, Close }) {
    const closeRef = useRef(null);
    const { fileRef, handleImageUpload, image, isLoading } = useUploadAvatar(user);
    const { mutate: updateUserProfile, isLoading: isProfileLoading, isError, error } = useUpdateUserProfile()



    async function onSubmit(values, actions) {
        let data = {};
        for (let element in values) {
            if (values[element]) {
                data[element] = values[element];
            }
        }

        if (Object.keys(data).length === 0) return;
        updateUserProfile(data, {
            onSuccess: () => {
                actions.setSubmitting(false);
                actions.resetForm();
                setTimeout(() => closeRef.current.click(), 1000)
            }
        });
    }
    return (
        <>
            <div className='z-[100] gap-10 flex justify-between'>
                <div className='flex-shrink-0 flex-grow-[.3] p-5 gap-2  flex justify-center items-center flex-col shadow-xl rounded-lg relative'>
                    <input
                        className='hidden'
                        type="file"
                        name="avatar"
                        id="avatar"
                        onChange={handleImageUpload}
                        ref={fileRef}
                        accept='image/* ,.jpg, .png'
                    />
                    <Popover>
                        <PopoverTrigger title='update image' className='absolute border border-red-600 z-10 bg-base cursor-pointer p-3 w-fit rounded-full bg-transparent shadow-xl'>
                            {isLoading
                                ? <SpinLoader
                                    color={"rgb(248 113 113)"}
                                    loading={isLoading}
                                    marginBlock={'auto'}
                                    size={15} />
                                : <CameraIcon className='w-6 h-6 fill-white stroke-red-600' />}
                        </PopoverTrigger>
                        <PopoverContent className='relative z-[100] w-30 bg-white py-2 '>
                            <ul>
                                <li className={popContent} onClick={() => fileRef.current.click()}>Change Photo</li>
                                <li className={popContent}>Delete Photo</li>
                            </ul>
                        </PopoverContent>
                    </Popover>
                    <Avatar className='w-56 h-56  bg-neutral-400 rounded-full border-white'>
                        <AvatarImage src={image.href} />
                        <AvatarFallback><User2 className='w-full h-full border rounded-full border-neutral-500' /></AvatarFallback>
                    </Avatar>
                </div>
                <div className='flex-1'>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={profileValidationSchema}
                    >
                        <Form autoComplete='off'>
                            <CustomInput name={'firstname'} title={'First Name'} type={'text'} />
                            <CustomInput name={'lastname'} title={'Last Name'} type={'text'} />
                            <CustomInput name={'email'} title={'Email'} type={'email'} />
                            <CustomInput name={'phoneNumber'} title={'Phone Number'} type={'tel'} />
                            <Button type='submit' disabled={isProfileLoading}>
                                {isProfileLoading ? <SpinLoader
                                    color={"#fff"}
                                    loading={isProfileLoading}
                                    marginBlock={'auto'}
                                    size={15} /> : "Update"}

                            </Button>
                            <Close ref={closeRef}></Close>
                            {isError ? <p className='text-destructive text-sm mt-1'>{error?.response.data.message}</p> : ''}
                        </Form>

                    </Formik>
                </div>
            </div>
        </>
    )
}

function useUploadAvatar(user) {
    const fileRef = useRef();
    const [avatar, setAvatar] = useState();

    const { data: userAvatar, mutate: updateAvatar, isLoading, isSuccess } = useUpdateUserAvatar();

    async function handleImageUpload(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('avatar', file);
        updateAvatar(formData);
        isSuccess && setAvatar(userAvatar.data.data.avatar.localPath);
    }

    let image = new URL(avatar
        ? `${route.API}/${avatar}`
        : user.avatar.localPath
            ? `${route.API}/${user.avatar.localPath}`
            : user.avatar.url || null);



    return { fileRef, image, handleImageUpload, isLoading }
}

const popContent = `
 py-3 
 px-3 
 cursor-pointer
 rounded-t-sm
 hover:bg-neutral-200
 
`

export default UserProfile