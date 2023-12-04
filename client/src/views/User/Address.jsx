import UserProfileLayout from "@/components/Layout/UserProfileLayout";
import AddressSkeleton from "@/components/Skeleton/AddressSkeleton";
import { AddUserAddress } from "@/components/common/AddAddress";
import ShowAddress from "@/components/common/ShowAddress";
import { useUserAddresses } from "@/lib/helpers/useUserQuery";



function Address() {
    const { data, isLoading } = useUserAddresses({ user: true });
    return (
        <main>
            <UserProfileLayout>
                <div>
                    <h2 className="text-2xl text-primary font-semibold">Address</h2>
                    {isLoading || !data ? <AddressSkeleton /> :
                        <div className="flex flex-wrap gap-4">
                            {data && data?.address.map(address => {
                                return (
                                    <ShowAddress key={address.id} user={data} address={address} />
                                )
                            })}
                            <AddUserAddress />
                        </div>
                    }
                </div>
            </UserProfileLayout>
        </main>
    )
}

export default Address