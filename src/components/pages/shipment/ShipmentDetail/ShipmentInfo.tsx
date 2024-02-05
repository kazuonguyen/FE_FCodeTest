export interface ShipmentInfoProps {
    id_delivery: string;
}

export default function ShipmentInfo({ id_delivery }: ShipmentInfoProps) {
    return (
        <div
            className="flex flex-row items-center justify-center"
            style={{
                marginTop: "16px",
                borderRadius: "100px",
                padding: "5px 16px",
                background: "var(--3-a-3-a-3-c, #3A3A3C)",
                marginBottom: "36px",
            }}
        >
            <p
                className="font-bold"
                style={{
                    color: "var(--fbfbfd, #FBFBFD)",
                    textAlign: "center",
                    fontSize: "18px",
                }}
            >
                Mã lô:
            </p>
            <p
                style={{
                    color: "var(--fbfbfd, #FBFBFD)",
                    textAlign: "center",
                    fontSize: "18px",
                    fontWeight: "500",
                    marginLeft: "8px",
                }}
            >
                {id_delivery}
            </p>
        </div>
    );
}
