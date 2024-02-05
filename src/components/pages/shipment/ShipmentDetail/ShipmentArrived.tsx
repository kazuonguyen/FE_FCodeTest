import { formatDate } from "@/functions/formatFunction";
import shipment from "./shipment.module.css";

export interface ShipmentArrivedProps {
    arrived_at: string;
}

export default function ShipmentArrived({ arrived_at }: ShipmentArrivedProps) {
    return (
        <div className={` ${shipment.shipmentArrivedAt} flex flex-row items-center justify-center`}>
            <div className="flex flex-col justify-center items-center text-center">
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "16px",
                    }}
                >
                    Ngày giao hàng
                </p>
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "30px",
                        fontWeight: "500",
                    }}
                >
                    {formatDate(arrived_at)}
                </p>
            </div>
        </div>
    );
}
