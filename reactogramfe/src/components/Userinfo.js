import { useSelector } from "react-redux";

function userInfo() {
    const user=useSelector(store=>store.user);
    const userdata=user.userdata;
    return (  
        <div className="userinfo">
             <span className="text-bold text-center">userdata.fullname</span>
        </div>
    );
}

export default userInfo;