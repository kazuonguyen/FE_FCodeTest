import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { addSelectedOrder, removeSelectedOrder } from "@/redux/slice/selectedOrderSlice";

export interface SelectOrderProps {
    id_order: string;
    id_delivery: string;
}

export default function SelectOrder({ id_order, id_delivery }: SelectOrderProps) {
    const selectedOrders = useSelector((state: RootState) => state.selectedOrder.selectedOrders);
    const [checked, setChecked] = useState<boolean>(false);
    const dispatch = useDispatch();
    useEffect(() => {
        // console.log(list_order);
        // Check if list_order include id_order then set checked to true else set checked to false
        if (selectedOrders.includes(id_order)) {
            setChecked(true);
        } else {
            setChecked(false);
        }
        // When list order is changed, save to local storage
        localStorage.setItem("list_order", JSON.stringify(selectedOrders));
    }, [selectedOrders]);
    return (
        <div className="inline-flex items-center">
            <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                htmlFor={id_order}
                data-ripple-dark="true"
            >
                {/* If id_shipment is not null then disable checkbox */}
                {/* If id_shipment is null then enable checkbox for user to checked and add to shipment list */}
                {id_delivery !== null && id_delivery !== "" ? (
                    <>
                        <input
                            id={id_order}
                            type="checkbox"
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-[6px] border border-[#3a3a3c] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#C7C7CC] before:opacity-0 before:transition-opacity checked:border-[#C7C7CC] checked:bg-[#C7C7CC] checked:before:bg-[#C7C7CC] hover:before:opacity-10"
                            checked={id_delivery !== null && id_delivery !== ""}
                            disabled={id_delivery !== null && id_delivery !== ""}
                        />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                            <Image
                                src="/icon/tick-dark.svg"
                                alt="checked-icon"
                                width={10}
                                height={8}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <input
                            id={id_order}
                            type="checkbox"
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-[6px] border border-[#3a3a3c] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#3a3a3c] before:opacity-0 before:transition-opacity checked:border-[#007AFF] checked:bg-[#007AFF] checked:before:bg-[#007AFF] hover:before:opacity-10"
                            onClick={() => {
                                setChecked(!checked);
                                if (checked) {
                                    // Remove from shipment list
                                    dispatch(removeSelectedOrder(id_order));
                                } else {
                                    // Add to shipment list
                                    dispatch(addSelectedOrder(id_order));
                                }
                            }}
                            checked={checked}
                        />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                            <Image src="/icon/tick.svg" alt="checked-icon" width={10} height={8} />
                        </div>
                    </>
                )}
            </label>
        </div>
    );
}
