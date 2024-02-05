/* eslint-disable no-shadow */
import { use, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLogistics } from "@/api/apiUtils";
import { setError } from "@/redux/slice/alertSlice";

export interface Design {
    id_design: string;
    id_user: string;
    id_ecommerce_product: string;
    design_name: string;
    design_mockup: string;
    rank: number;
    created_at: string;
    updated_at: string;
    design_status: string;
    clo_color: string;
    clo_type: string;
}

export interface MockDesign {
    design: Design;
    front: string;
    back: string;
    front_non_bg: string;
    back_non_bg: string;
    big: string;
}

export default function useGetMockDesign() {
    const [isLoadingMockDesign, setIsLoadingMockDesign] = useState<boolean>(false);
    const [mockupDesign, setMockupDesign] = useState<MockDesign | null>(null);
    const dispatch = useDispatch();
    const getMockDesign = async (id_design: string) => {
        if (id_design === null || id_design === undefined) return;
        try {
            const res = await fetchLogistics(`protected/design?iddesign=${id_design}`, {
                method: "GET",
                withToken: true,
            });
            const data = await res.json();
            if (res.status === 200) {
                // console.log("data", data);
                setMockupDesign(data.data);
            } else if (data.message_vi) {
                dispatch(setError(data.message_vi));
            } else {
                throw new Error("Có lỗi xảy ra trong quá trình lấy thông tin thiết kế");
            }
        } catch (error) {
            dispatch(setError("Có lỗi xảy ra trong quá trình lấy thông tin thiết kế"));
        } finally {
            setIsLoadingMockDesign(false);
        }
    };

    return { isLoadingMockDesign, mockupDesign, getMockDesign };
}
