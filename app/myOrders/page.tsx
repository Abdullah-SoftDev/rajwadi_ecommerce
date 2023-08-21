import { getMyOrders } from "@/repositories/productRepository/serversideFunctions";

type Props = {
    searchParams: { [username: string]: string };
};

const Page = async ({ searchParams }: Props) => {
    const { uid } = searchParams;
    const ordersList = await getMyOrders(uid);
    console.log(ordersList)

    return (
        <div>page</div>
    )
}

export default Page