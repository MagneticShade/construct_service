
const Header = () => {
    return (
        <div className="fixed left-0 top-0 w-[300px] bg-slate-100 bg-opacity-50 h-screen z-50 flex items-center flex-col gap-[50vh] -translate-x-[99%] hover:translate-x-0 duration-200">
            <div className="">
                <span>logo</span>
            </div>
            <ul className="flex flex-col -translate-y-1/2 gap-10 text-[36px] uppercase">
                <li>
                    <a href="">home</a>
                </li>
                <li>
                    <a href="">about</a>
                </li>
                <li>
                    <a href="">contact</a>
                </li>
            </ul>
        </div>
    );
}

export default Header;
