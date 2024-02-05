/* eslint-disable react/no-unused-prop-types */
/* eslint-disable import/prefer-default-export */

interface Props {
    className?: string;
    strokeColor?: string;
}

export function DrawerIcon({ className, strokeColor }: Props) {
    return (
        <svg
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <line
                x1="1"
                y1="5"
                x2="17"
                y2="5"
                stroke={strokeColor || "white"}
                strokeWidth="2"
                strokeLinecap="round"
            />
            <line
                x1="1"
                y1="13"
                x2="17"
                y2="13"
                stroke={strokeColor || "white"}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function InfoIcon({ className, strokeColor }: Props) {
    return (
        <svg
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle
                cx="12.5"
                cy="12.5"
                r="11.5"
                transform="rotate(-180 12.5 12.5)"
                stroke={strokeColor || "#3A3A3C"}
                strokeWidth="2"
            />
            <path
                d="M13.0707 10.2725C13.623 10.2725 14.0707 10.7202 14.0707 11.2725V16.6444C14.0707 17.1966 14.5185 17.6444 15.0707 17.6444H15.8223C16.1966 17.6444 16.5 17.9478 16.5 18.322C16.5 18.6963 16.1966 18.9997 15.8223 18.9997H10.1777C9.80341 18.9997 9.5 18.6963 9.5 18.322C9.5 17.9478 9.80341 17.6444 10.1777 17.6444H11.1747C11.727 17.6444 12.1747 17.1966 12.1747 16.6444V12.6278C12.1747 12.0755 11.727 11.6278 11.1747 11.6278H10.2623C9.88805 11.6278 9.58464 11.3244 9.58464 10.9501C9.58464 10.5759 9.88805 10.2725 10.2623 10.2725H13.0707Z"
                fill={strokeColor || "#3A3A3C"}
            />
            <circle cx="12.75" cy="7.25" r="1.25" fill={strokeColor || "#3A3A3C"} />
        </svg>
    );
}

export function NoticeIcon({ className, strokeColor }: Props) {
    return (
        <svg
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle cx="5" cy="5" r="4.625" stroke={strokeColor || "#3A3A3C"} strokeWidth="0.75" />
            <path
                d="M5.00089 2.04541C5.20013 2.04541 5.36089 2.20837 5.35818 2.40759L5.31403 5.65694C5.31171 5.82823 5.17219 5.96586 5.00089 5.96586C4.82959 5.96586 4.69007 5.82823 4.68774 5.65694L4.64359 2.40759C4.64089 2.20837 4.80164 2.04541 5.00089 2.04541ZM5.00089 7.54257C4.8695 7.54257 4.75675 7.49552 4.66264 7.40141C4.56854 7.30731 4.52148 7.19456 4.52148 7.06317C4.52148 6.93177 4.56854 6.81903 4.66264 6.72492C4.75675 6.63082 4.8695 6.58376 5.00089 6.58376C5.13228 6.58376 5.24503 6.63082 5.33913 6.72492C5.43324 6.81903 5.48029 6.93177 5.48029 7.06317C5.48029 7.15017 5.4581 7.23007 5.41371 7.30287C5.37109 7.37567 5.31339 7.43426 5.24059 7.47865C5.16957 7.52126 5.08967 7.54257 5.00089 7.54257Z"
                fill={strokeColor || "#3A3A3C"}
            />
        </svg>
    );
}

export function LockerIcon({ className, strokeColor }: Props) {
    return (
        <svg
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <g clipPath="url(#clip0_2219_12749)">
                <path
                    d="M8.33333 4.5835H1.66667C1.43655 4.5835 1.25 4.77004 1.25 5.00016V8.75016C1.25 8.98028 1.43655 9.16683 1.66667 9.16683H8.33333C8.56345 9.16683 8.75 8.98028 8.75 8.75016V5.00016C8.75 4.77004 8.56345 4.5835 8.33333 4.5835Z"
                    stroke={strokeColor || "#3A3A3C"}
                    strokeWidth="0.75"
                    strokeLinejoin="round"
                />
                <path
                    d="M2.91602 4.5835V2.91683C2.91602 1.76624 3.84877 0.833496 4.99935 0.833496C6.14993 0.833496 7.08268 1.76624 7.08268 2.91683V4.5835"
                    stroke={strokeColor || "#3A3A3C"}
                    strokeWidth="0.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5 6.25V7.5"
                    stroke={strokeColor || "#3A3A3C"}
                    strokeWidth="0.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_2219_12749">
                    <rect width="10" height="10" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

export function ArrowIcon({ className, strokeColor }: Props) {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M2 9.93732H17.75"
                stroke={strokeColor || "white"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.87512 2.06223L17.7501 9.93723L9.87512 17.8122"
                stroke={strokeColor || "white"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function CartIcon({ className, strokeColor }: Props) {
    return (
        <svg
            viewBox="0 0 21 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect
                x="1"
                y="6.26318"
                width="19"
                height="17.7368"
                rx="3"
                stroke={strokeColor || "white"}
                strokeWidth="2"
            />
            <path
                d="M15.1209 6.25C15.1209 5.0068 14.6341 3.81451 13.7677 2.93544C12.9013 2.05636 11.7262 1.5625 10.5009 1.5625C9.27556 1.5625 8.10044 2.05636 7.23403 2.93544C6.36761 3.81451 5.88086 5.0068 5.88086 6.25"
                stroke={strokeColor || "white"}
                strokeWidth="2"
            />
        </svg>
    );
}

export function XIcon({ className, strokeColor }: Props) {
    return (
        <svg
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M11.9497 11.9497L2.0502 2.05023M11.9497 2.05025L2.05019 11.9497"
                stroke={strokeColor || "#BDBDBD"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function ArrowHeadIcon({ className, strokeColor }: Props) {
    return (
        <svg
            viewBox="0 0 14 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M13.0607 13.047C13.6464 12.4612 13.6464 11.5115 13.0607 10.9257L3.51472 1.37973C2.92893 0.793938 1.97919 0.793938 1.3934 1.37972C0.807613 1.96551 0.807613 2.91526 1.3934 3.50105L9.87868 11.9863L1.3934 20.4716C0.80761 21.0574 0.80761 22.0071 1.3934 22.5929C1.97918 23.1787 2.92893 23.1787 3.51472 22.5929L13.0607 13.047ZM11.5 13.4863L12 13.4863L12 10.4863L11.5 10.4863L11.5 13.4863Z"
                fill={strokeColor || "#FFFFFF"}
            />
        </svg>
    );
}

export function PenEditIcon({ className, strokeColor }: Props) {
    return (
        <svg
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <g clipPath="url(#clip0_2449_3804)">
                <path
                    d="M3.79102 22.75H23.291"
                    stroke={strokeColor || "#3A3A3C"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5.95898 14.4733V18.4167H9.92247L21.1257 7.20855L17.1688 3.25L5.95898 14.4733Z"
                    stroke={strokeColor || "#3A3A3C"}
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_2449_3804">
                    <rect width="26" height="26" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

export function SearchIcon({ className, strokeColor }: Props) {
    return (
        <svg
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle cx="9.26379" cy="9.26476" r="7.52941" stroke={strokeColor || "#BDBDBD"} />
            <path
                d="M15.7071 14.2929L15 13.5858L13.5858 15L14.2929 15.7071L15.7071 14.2929ZM18.2929 19.7071C18.6834 20.0976 19.3166 20.0976 19.7071 19.7071C20.0976 19.3166 20.0976 18.6834 19.7071 18.2929L18.2929 19.7071ZM14.2929 15.7071L18.2929 19.7071L19.7071 18.2929L15.7071 14.2929L14.2929 15.7071Z"
                fill={strokeColor || "#BDBDBD"}
            />
        </svg>
    );
}

export function ListIcon({ className, strokeColor }: Props) {
    return (
        <svg
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect x="6" y="1" width="13" height="2" rx="1" fill={strokeColor || "#3A3A3C"} />
            <path
                d="M6 9.5C6 8.94772 6.44772 8.5 7 8.5H18C18.5523 8.5 19 8.94772 19 9.5C19 10.0523 18.5523 10.5 18 10.5H7C6.44772 10.5 6 10.0523 6 9.5Z"
                fill={strokeColor || "#3A3A3C"}
            />
            <rect x="6" y="16" width="13" height="2" rx="1" fill={strokeColor || "#3A3A3C"} />
            <path
                d="M2 3C2.55229 3 3 2.5523 3 2C3 1.44771 2.55229 1 2 1C1.44771 1 1 1.44771 1 2C1 2.5523 1.44771 3 2 3Z"
                stroke={strokeColor || "#333333"}
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M2 10.5C2.55229 10.5 3 10.0523 3 9.5C3 8.94771 2.55229 8.5 2 8.5C1.44771 8.5 1 8.94771 1 9.5C1 10.0523 1.44771 10.5 2 10.5Z"
                stroke={strokeColor || "#333333"}
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M2 18C2.55229 18 3 17.5523 3 17C3 16.4477 2.55229 16 2 16C1.44771 16 1 16.4477 1 17C1 17.5523 1.44771 18 2 18Z"
                stroke={strokeColor || "#333333"}
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function GridIcon({ className, strokeColor }: Props) {
    return (
        <svg
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M9.49971 0.351807V7.38884M9.49971 18.6481V11.6111M0.351562 11.6111H9.49971M9.49971 11.6111V7.38884M9.49971 7.38884H18.6479"
                stroke={strokeColor || "#3A3A3C"}
                strokeWidth="2"
            />
            <rect
                x="1"
                y="1"
                width="17"
                height="17"
                rx="2"
                stroke={strokeColor || "#3A3A3C"}
                strokeWidth="2"
            />
        </svg>
    );
}

export function GoogleIcon({ className }: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
            <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
            />
            <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
            />
            <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
            />
            <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
        </svg>
    );
}

export function Notfound404({ className }: Props) {
    return (
        <svg
            viewBox="0 0 476 189"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M0.87287 151.264V125.075L78.0213 3.18181H99.8608V40.4688H86.544L34.6087 122.766V124.187H142.297V151.264H0.87287ZM87.6094 185V143.274L87.9645 131.555V3.18181H119.037V185H87.6094ZM237.867 188.462C223.248 188.462 210.701 184.763 200.225 177.365C189.808 169.908 181.788 159.165 176.166 145.138C170.602 131.052 167.821 114.096 167.821 94.2685C167.88 74.4413 170.691 57.5734 176.255 43.6648C181.877 29.697 189.897 19.0436 200.314 11.7045C210.789 4.36553 223.307 0.696016 237.867 0.696016C252.426 0.696016 264.944 4.36553 275.42 11.7045C285.896 19.0436 293.916 29.697 299.479 43.6648C305.102 57.6326 307.913 74.5005 307.913 94.2685C307.913 114.155 305.102 131.141 299.479 145.227C293.916 159.254 285.896 169.967 275.42 177.365C265.003 184.763 252.486 188.462 237.867 188.462ZM237.867 160.675C249.23 160.675 258.197 155.082 264.767 143.896C271.395 132.65 274.71 116.108 274.71 94.2685C274.71 79.8272 273.201 67.6941 270.182 57.8693C267.164 48.0445 262.902 40.6463 257.398 35.6747C251.894 30.6439 245.383 28.1285 237.867 28.1285C226.562 28.1285 217.625 33.7512 211.056 44.9964C204.486 56.1825 201.172 72.6065 201.113 94.2685C201.053 108.769 202.503 120.961 205.463 130.845C208.481 140.729 212.743 148.187 218.247 153.217C223.751 158.189 230.291 160.675 237.867 160.675ZM334.125 151.264V125.075L411.273 3.18181H433.113V40.4688H419.796L367.861 122.766V124.187H475.549V151.264H334.125ZM420.861 185V143.274L421.216 131.555V3.18181H452.289V185H420.861Z"
                fill="url(#paint0_linear_2174_28676)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_2174_28676"
                    x1="488"
                    y1="-93"
                    x2="-12"
                    y2="282"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop />
                    <stop offset="1" stopColor="#8F8F8F" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export function SupportEmailIcon({ className }: Props) {
    return (
        <svg
            className={className}
            viewBox="0 0 40 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <mask
                id="mask0_3631_4912"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="40"
                height="28"
            >
                <rect x="0.5" y="0.5" width="39" height="27" rx="4.5" fill="white" stroke="black" />
            </mask>
            <g mask="url(#mask0_3631_4912)">
                <rect
                    x="-8"
                    y="37.2842"
                    width="40"
                    height="40"
                    rx="2"
                    transform="rotate(-45 -8 37.2842)"
                    fill="black"
                />
                <rect
                    x="-6.58579"
                    y="-6.71582"
                    width="38"
                    height="38"
                    rx="1"
                    transform="rotate(-45 -6.58579 -6.71582)"
                    fill="black"
                    stroke="white"
                    strokeWidth="2"
                />
                <rect
                    x="-27"
                    y="14"
                    width="28"
                    height="28"
                    transform="rotate(-45 -27 14)"
                    fill="black"
                />
                <rect
                    x="28"
                    y="14"
                    width="28"
                    height="28"
                    transform="rotate(-45 28 14)"
                    fill="black"
                />
            </g>
        </svg>
    );
}

export function SupportPhoneIcon({ className }: Props) {
    return (
        <svg
            className={className}
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M35.2556 27.9766L30.5989 27.445C30.0513 27.3807 29.4963 27.4413 28.9756 27.6223C28.4548 27.8033 27.9819 28.0999 27.5922 28.49L24.2189 31.8633C19.0144 29.2164 14.7842 24.9861 12.1372 19.7816L15.5289 16.39C16.3172 15.6016 16.7022 14.5016 16.5739 13.3833L16.0422 8.76331C15.9383 7.86897 15.5091 7.04408 14.8363 6.4457C14.1636 5.84732 13.2943 5.51724 12.3939 5.51831H9.22223C7.15056 5.51831 5.42723 7.24165 5.55556 9.31331C6.52723 24.97 19.0489 37.4733 34.6872 38.445C36.7589 38.5733 38.4822 36.85 38.4822 34.7783V31.6066C38.5006 29.755 37.1072 28.1966 35.2556 27.9766Z"
                fill="#30D158"
            />
        </svg>
    );
}

export function SupportFacebookIcon({ className }: Props) {
    return (
        <svg
            className={className}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_3631_4920)">
                <path
                    d="M40 20C40 8.95437 31.0456 0 20 0C8.95437 0 0 8.95422 0 20C0 29.9825 7.31375 38.2567 16.875 39.757V25.7812H11.7969V20H16.875V15.5937C16.875 10.5812 19.8609 7.8125 24.4292 7.8125C26.6175 7.8125 28.9062 8.20312 28.9062 8.20312V13.125H26.3844C23.8997 13.125 23.125 14.6667 23.125 16.2484V20H28.6719L27.7852 25.7812H23.125V39.757C32.6862 38.2567 40 29.9827 40 20Z"
                    fill="#1877F2"
                />
                <path
                    d="M27.7852 25.7812L28.6719 20H23.125V16.2484C23.125 14.6666 23.8998 13.125 26.3844 13.125H28.9062V8.20312C28.9062 8.20312 26.6175 7.8125 24.4292 7.8125C19.8609 7.8125 16.875 10.5813 16.875 15.5938V20H11.7969V25.7812H16.875V39.757C17.9088 39.919 18.9536 40.0003 20 40C21.0464 40.0003 22.0912 39.9191 23.125 39.757V25.7812H27.7852Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="clip0_3631_4920">
                    <rect width="40" height="40" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

export function SupportZaloIcon({ className }: Props) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path
                fill="#2962ff"
                d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10	c4.722,0,8.883-2.348,11.417-5.931V36H15z"
            />
            <path
                fill="#eee"
                d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19	c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742	c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083	C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"
            />
            <path
                fill="#2962ff"
                d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75	S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"
            />
            <path fill="#2962ff" d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z" />
            <path
                fill="#2962ff"
                d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75	S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5	c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"
            />
            <path
                fill="#2962ff"
                d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5	c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"
            />
        </svg>
    );
}
