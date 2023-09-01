import { Fingerprint, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import Logo from "./logo";

const BaseNavbar = ()=>{

    return(
        <div>
            <nav className="w-full bg-white border-b fixed top-0 left-0 right-0 z-10 px-10 py-2 flex items-center">
                {/* logo */}
                <div>
                    <Logo/>
                </div>
                {/* logo */}
                {/* menu */}
                <div>

                </div>
                {/* menu */}
                {/* profile */}
                <div className="ml-auto flex items-center">
                <div className="p-2 bg-blue-100 flex items-center rounded-xl">
            <div className="p-1 rounded-lg bg-blue-300 text-blue-900">
              <Fingerprint className="w-4 h-4"/>
            </div>
            <span className="ml-2 text-blue-900 uppercase text-xs font-semibold">Admin</span>
          </div>
          <Button size="icon" className="bg-blue-100 flex rounded-xl text-blue-900 ml-3 hover:bg-blue-700 hover:text-white h-10 w-10 shadow-none">
            <LogOut className="w-4 h-4"/>
          </Button>
                </div>
                {/* profile */}
            </nav>
        </div>
    )

}

export default BaseNavbar;