import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLogistics } from "@/api/apiUtils";
import { clearMessage, setError } from "@/redux/slice/alertSlice";

export default function useGetCounterPage() {
    const [counterPage, setCounterPage] = useState<number>(0);
    const dispatch = useDispatch();

    // Get counter page
    const getCounterPage = async () => {
        try {
            const res = await fetchLogistics("protected/order/list/pagenum?limit=20", {
                method: "GET",
                withToken: true,
            });
            const data = await res.json();
            if (res.status === 200) {
                setCounterPage(data.data);
            } else if (data.message_vi) {
                dispatch(setError(data.message_vi));
                setCounterPage(1);
            } else {
                throw new Error("Có lỗi xảy ra khi lấy dữ liệu");
            }
        } catch (error) {
            dispatch(setError("Có lỗi xảy ra khi lấy dữ liệu"));
            setCounterPage(1);
        }
    };
    // First get counter page when component mounted
    useEffect(() => {
        getCounterPage();
    }, []);
    return { counterPage, getCounterPage };
}
