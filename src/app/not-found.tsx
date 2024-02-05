import ScreenStyleA from "@/components/global/ScreenStyle/ScreenStyleAuth";
import ReturnButton from "@/components/global/NotFound/ReturnButton";
import NotFoundImg from "@/components/global/NotFound/NotFound";

export default function NotFound() {
    return (
        <ScreenStyleA className="grid content-center">
            <div className="flex flex-col items-center md:gap-16 gap-9 px-5">
                <NotFoundImg />
                <ReturnButton />
            </div>
        </ScreenStyleA>
    );
}
