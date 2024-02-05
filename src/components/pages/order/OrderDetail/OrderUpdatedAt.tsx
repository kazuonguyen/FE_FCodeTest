import { formatDate } from "@/functions/formatFunction";
import order from "./order.module.css";

export interface OrderUpdatedAtProps {
    updated_at: string;
}

export default function OrderUpdatedAt({ updated_at }: OrderUpdatedAtProps) {
    return (
        <div className={` ${order.orderCreatedAt} flex flex-row items-center justify-center`}>
            <div className="flex flex-col justify-center items-center text-center">
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "16px",
                    }}
                >
                    Ngày hoàn thành
                </p>
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "30px",
                        fontWeight: "500",
                    }}
                >
                    {formatDate(updated_at)}
                </p>
            </div>
        </div>
    );
}
