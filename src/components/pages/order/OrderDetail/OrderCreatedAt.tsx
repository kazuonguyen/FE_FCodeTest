import { formatDate } from "@/functions/formatFunction";
import order from "./order.module.css";

export interface OrderCreatedAtProps {
    created_at: string;
}

export default function OrderCreatedAt({ created_at }: OrderCreatedAtProps) {
    return (
        <div className={` ${order.orderCreatedAt} flex flex-row items-center justify-center`}>
            <div className="flex flex-col justify-center items-center text-center">
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "16px",
                    }}
                >
                    Ngày tạo đơn
                </p>
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "30px",
                        fontWeight: "500",
                    }}
                >
                    {formatDate(created_at)}
                </p>
            </div>
        </div>
    );
}
