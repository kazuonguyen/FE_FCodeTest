import { useEffect } from "react";
import Image from "next/image";
import order from "./order.module.css";
import Loading from "@/components/global/Loading/Loading";
import useGetMockDesign from "@/hooks/useGetMockDesign";

export interface DesignImageProps {
    id_design: string;
}

export default function DesignImage({ id_design }: DesignImageProps) {
    // First render, set mock design image url to state of front side  design
    const { isLoadingMockDesign, mockupDesign, getMockDesign } = useGetMockDesign();
    useEffect(() => {
        getMockDesign(id_design);
    }, [id_design]);
    return (
        <div className={`${order.designItem} flex flex-col h-full w-full`}>
            <div
                className={`${order.designImage} relative flex items-center justify-center min-h-screen w-full`}
            >
                {/* Show loading when fetching mock design from API */}
                {isLoadingMockDesign === true || id_design === null || id_design === undefined ? (
                    <Loading />
                ) : (
                    <Image
                        src={mockupDesign?.big as string}
                        layout="fill"
                        objectFit="contain"
                        alt="Design image"
                        style={{
                            aspectRatio: "1/2",
                        }}
                    />
                )}
            </div>
        </div>
    );
}
