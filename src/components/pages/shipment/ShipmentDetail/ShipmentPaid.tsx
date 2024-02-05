import { formatDate } from "@/functions/formatFunction";
import shipment from "./shipment.module.css";

export interface ShipmentPaidProps {
    paid_at: string;
}

export default function ShipmentPaid({ paid_at }: ShipmentPaidProps) {
    return (
        <div className={` ${shipment.shipmentPaidAt} flex flex-row items-center justify-center`}>
            <div className="flex flex-col justify-center items-center text-center">
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "16px",
                    }}
                >
                    Ngày thanh toán
                </p>
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "30px",
                        fontWeight: "500",
                    }}
                >
                    {formatDate(paid_at)}
                </p>
            </div>
        </div>
    );
}
