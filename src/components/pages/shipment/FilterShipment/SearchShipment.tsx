import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "@/redux/store/store";
import { setFilterShipmentByCode } from "@/redux/slice/shipmentSlice";

export default function SearchShipment() {
    const dispatch = useDispatch();
    const filterShipmentByCode = useSelector(
        (state: RootState) => state.shipment.filerShipmentByCode,
    );
    const handleSearchByShipmentCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            dispatch(setFilterShipmentByCode(""));
        } else {
            dispatch(setFilterShipmentByCode(e.target.value));
        }
    };
    return (
        <div className="relative">
            <Image
                src="/icon/search.svg"
                alt="search"
                width={21}
                height={21}
                className="absolute aspect-square top-[50%] -translate-y-[50%] left-3"
            />
            <input
                type="text"
                value={filterShipmentByCode}
                className="border-[1px] border-[#BDBDBD] appearance-none focus:outline-none focus:ring-transparent focus:border-[#007aff] hover:border-[#007aff] focus:ring-1 active:border-[#007aff] focus:ring-[#007aff] hover:ring-[#007aff] active:ring-[#007aff]"
                placeholder="Tìm lô hàng"
                style={{
                    width: "200px",
                    height: "44px",
                    paddingLeft: "40px",
                    paddingRight: "20px",
                    borderRadius: "100px",
                    display: "flex",
                }}
                onChange={handleSearchByShipmentCode}
            />
        </div>
    );
}
