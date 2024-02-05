import ScreenStyleAuth from "../ScreenStyle/ScreenStyleAuth";
import Loading from "./Loading";

interface CenterLoadingProps {
    className?: string;
    style?: React.CSSProperties;
}

export function CenterLoading({ className, style }: CenterLoadingProps) {
    return (
        <Loading
            className={className}
            style={{
                ...style,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
            }}
        />
    );
}

export default function LoadingPage() {
    return (
        <ScreenStyleAuth>
            <CenterLoading />
        </ScreenStyleAuth>
    );
}
