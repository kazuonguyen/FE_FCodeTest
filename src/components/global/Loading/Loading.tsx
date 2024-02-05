import loading from "./loading.module.css";

interface LoadingProps {
    className?: string;
    style?: React.CSSProperties;
}

export default function Loading({ className, style }: LoadingProps) {
    return (
        <div
            className={`${loading.GradientBase} ${className} grid place-items-center`}
            style={style}
        >
            <svg className={`${loading.SvgSpinner}`} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" strokeWidth="5" stroke="#FFFFFF" />
                <circle
                    className={`${loading.path}`}
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                />
            </svg>
        </div>
    );
}
