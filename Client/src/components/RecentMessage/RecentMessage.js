import React from "react"

const RecentMessage = (props) => {
    const { users, currentUser } = props;
    const handleOnClick = (e) => {
        e.preventDefault();
        const id = e.target.id;
        currentUser(id);
    }
    return (
        <div className="col-5 px-0 bg-white">
            <div className="bg-white">
                <div className="bg-gray px-4 py-2 bg-light">
                    <p className="h5 mb-0 py-1">Recent</p>
                </div>
                <div className="messages-box">
                    <div className="list-group rounded-0">
                        {users.map((item, index) => {
                            return (
                                <button 
                                className="list-group-item list-group-item-action active text-white rounded-0"
                               
                                id = {item.user.id + "-" + index}
                                onClick={handleOnClick} 
                                key={index}>
                                    <div className="media">
                                        <img
                                            src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                                            alt="user"
                                            width="50"
                                            className="rounded-circle"
                                        />
                                        <div className="media-body ml-4">
                                            <div className="d-flex align-items-center justify-content-between mb-1">
                                                <h6 className="mb-0">{item.user.username}</h6>
                                                <small className="small font-weight-bold">
                                                    {item.recentMessage.sendDate.split("T")[0]}
                                                </small>
                                            </div>
                                            <p className="font-italic mb-0 text-small">

                                            </p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RecentMessage;