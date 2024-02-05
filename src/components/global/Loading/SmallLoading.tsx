import screen from "../../../styles/screen.module.css";
import loading from "./loading.module.css";

interface SmallLoadingProps {
    className?: string;
}

export default function SmallLoading({ className }: SmallLoadingProps) {
    return (
        <div className={`${loading.SmallLoading} ${className}`} data-testid="loading-spinner">
            <div />
            <div />
            <div />
            <div />
        </div>
    );
}
