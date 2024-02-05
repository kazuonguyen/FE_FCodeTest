import shipment from "./shipment.module.css";

export interface ShipmentNumProps {
    count: number;
}

export function ShipmentNum({ count }: ShipmentNumProps) {
    return (
        <div className={` ${shipment.shipmentNum} flex flex-row items-center justify-center`}>
            <div className="flex flex-col justify-center items-center text-center">
                <p
                    style={{
                        color: "var(--fbfbfd, #FBFBFD)",
                        textAlign: "center",
                        fontSize: "16px",
                    }}
                >
                    Số lượng đơn:
                </p>
                <p
                    style={{
                        color: "var(--fbfbfd, #FBFBFD)",
                        textAlign: "center",
                        fontSize: "30px",
                        fontWeight: "500",
                    }}
                >
                    {count}
                </p>
            </div>
        </div>
    );
}
