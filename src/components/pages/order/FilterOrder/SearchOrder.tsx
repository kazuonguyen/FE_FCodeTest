import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "@/redux/store/store";
import { setFilterByCode } from "@/redux/slice/orderSlice";

export default function SearchOrder() {
    const dispatch = useDispatch();
    const filterOrderByCode = useSelector((state: RootState) => state.order.filterOrderByCode);
    const handleSearchByOrderCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            dispatch(setFilterByCode(""));
        } else {
            dispatch(setFilterByCode(e.target.value));
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
                value={filterOrderByCode}
                className="border-[1px] border-[#BDBDBD] appearance-none focus:outline-none focus:ring-transparent focus:border-[#007aff] hover:border-[#007aff] focus:ring-1 active:border-[#007aff] focus:ring-[#007aff] hover:ring-[#007aff] active:ring-[#007aff]"
                placeholder="Tìm đơn hàng"
                style={{
                    width: "200px",
                    height: "44px",
                    paddingLeft: "40px",
                    paddingRight: "20px",
                    borderRadius: "100px",
                    display: "flex",
                }}
                onChange={handleSearchByOrderCode}
            />
        </div>
    );
}
