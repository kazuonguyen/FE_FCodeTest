import order from "./order.module.css";

export interface OrderCodeProps {
    id_order: string;
}

export function OrderCode({ id_order }: OrderCodeProps) {
    return (
        <div className={` ${order.orderCode} flex flex-row items-center justify-center`}>
            <div className="flex flex-col justify-center items-center text-center">
                <p
                    style={{
                        color: "var(--fbfbfd, #FBFBFD)",
                        textAlign: "center",
                        fontSize: "16px",
                    }}
                >
                    Mã đơn:
                </p>
                <p
                    style={{
                        color: "var(--fbfbfd, #FBFBFD)",
                        textAlign: "center",
                        fontSize: "30px",
                        fontWeight: "500",
                    }}
                >
                    {id_order}
                </p>
            </div>
        </div>
    );
}
