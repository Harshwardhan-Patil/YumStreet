import { ChevronDownIcon, UserCircle2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { NavLink, useNavigate } from "react-router-dom"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { userLogout } from "@/redux/user/api/authApi";
import { useDispatch } from "react-redux";
import { route } from "@/constants";


function UserDropDown({ id }) {
    return (
        <Popover>
            <PopoverTrigger className={popoverTrigger}>
                <UserCircle2 style={{ width: '35px', height: '30px' }} />
                Harsh
                <ChevronDownIcon className={`duration-300 transition-all  w-6 fill-black`} />
            </PopoverTrigger>
            <PopoverContent align='end' sideOffset={10} className='w-48 py-2'>
                <ul >
                    <NavLink to={`/user/${id}/${route.USER_REVIEWS}`} className={popContent}>Profile</NavLink>
                    <NavLink to={`/user/${id}/${route.USER_ORDERS}`} className={popContent}>Orders</NavLink>
                    <NavLink to={`/user/${id}/${route.USER_REVIEWS}`} className={popContent + 'border-b border-neutral-400'}>Reviews</NavLink>
                    <li className={`${popContent} rounded-b-sm`}>
                        <AlertDialog>
                            <AlertDialogTrigger>Logout</AlertDialogTrigger>
                            <Logout />
                        </AlertDialog>
                    </li>
                </ul>
            </PopoverContent>
        </Popover>
    )
}

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function handleLogout() {
        try {
            const user = await userLogout(dispatch);
            if (user.status === 200) {
                navigate(route.HOME);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are You Sure You Want to Log Out?</AlertDialogTitle>
                <AlertDialogDescription>
                    {"Logging out will end your session. Save any changes before confirming. Click 'Confirm' to log out or 'Cancel' to stay logged in."}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}

const popContent = `
 py-3 
 px-3 
 cursor-pointer
 rounded-t-sm
 hover:bg-neutral-200
 block
`

const popoverTrigger = `
cursor-pointer 
p-2 
rounded-lg 
flex  
items-center 
gap-1
`

export default UserDropDown