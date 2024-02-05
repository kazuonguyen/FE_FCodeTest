import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLogistics } from "@/api/apiUtils";
import { clearMessage, setError } from "@/redux/slice/alertSlice";

export default function useGetQR() {
    const [isLoadingQR, setIsLoadingQR] = useState<boolean>(false);
    const [QR, setQR] = useState<string>("");
    const dispatch = useDispatch();

    // Get QR
    const getQR = async (id_order: string) => {
        setIsLoadingQR(true);
        try {
            const res = await fetchLogistics(`protected/order/qr?idorder=${id_order}`, {
                method: "GET",
                withToken: true,
            });
            const data = await res.json();
            if (res.status === 200) {
                setQR(data.data);
            } else if (data.message_vi) {
                dispatch(setError(data.message_vi));
            } else {
                throw new Error("Đã xảy ra lỗi khi lấy mã QR!");
            }
        } catch (error) {
            dispatch(setError("Đã xảy ra lỗi khi lấy mã QR!"));
        } finally {
            setIsLoadingQR(false);
        }
    };

    return { isLoadingQR, QR, getQR };
}
