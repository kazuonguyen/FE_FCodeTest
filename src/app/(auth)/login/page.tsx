import ScreenStyleAuth from "@/components/global/ScreenStyle/ScreenStyleAuth";
import LoginForm from "@/components/pages/auth/LoginForm";

export default function Page() {
    return (
        <ScreenStyleAuth className="grid justify-center">
            <LoginForm />
        </ScreenStyleAuth>
    );
}
