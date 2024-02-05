import NavbarBase from "./NavbarBase";
import IconGroup from "./Icons/IconGroup";

export default function Navbar() {
    return (
        <NavbarBase className="flex justify-between">
            <h2 className=" text-white">Home</h2>
            <h2>shop</h2>
        </NavbarBase>
    );
}
