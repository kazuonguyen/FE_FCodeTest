import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { saveAs } from "file-saver";
import { setError, setSuccess } from "@/redux/slice/alertSlice";
import { fetchLogistics } from "../apiUtils";

export interface RectangleCrop {
    width: number;
    height: number;
    x: number;
    y: number;
}

export async function GetOrderZip(id_design: string, dispatch: Dispatch<AnyAction>) {
    try {
        const res = await fetchLogistics(`protected/design/zip?iddesign=${id_design}`, {
            method: "GET",
            withToken: true,
        });
        const blob = await res.blob();
        if (res.status === 200) {
            dispatch(setSuccess("Đang tải xuống hình ảnh đã cắt"));
            // API return zip file
            saveAs(blob, `${id_design}.zip`);
            // Call download image API
        } else {
            throw new Error("Đã có lỗi xảy ra trong quá trình tải xuống");
        }
    } catch (error) {
        dispatch(setError("Đã có lỗi xảy ra trong quá trình tải xuống"));
    }
}

export default async function PostOrderCrop(
    id_design: string,
    rectangles: RectangleCrop[],

    dispatch: Dispatch<AnyAction>,
) {
    try {
        const res = await fetchLogistics("protected/design/crop", {
            method: "POST",
            body: {
                bboxes: rectangles,
                id_design,
            },
            withToken: true,
        });
        const data = await res.json();
        if (res.status === 200) {
            dispatch(setSuccess("Hình ảnh đã được cắt, đang tải xuống"));
            // Call download image API
            await GetOrderZip(id_design, dispatch);
        } else if (data.message_vi) {
            dispatch(setError(data.message_vi));
        } else {
            throw new Error("Cắt hình ảnh thất bại");
        }
    } catch (error) {
        dispatch(setError("Cắt hình ảnh thất bại"));
    }
}
