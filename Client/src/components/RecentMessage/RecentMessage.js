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
                                    <span className="media noclick ">
                                        
                                        <span className="media-body ml-4">
                                            <span className="d-flex align-items-center justify-content-between mb-1">
                                                <span className="mb-0">{item.user.username}</span>
                                                <span className="small font-weight-bold">
                                                    {item.recentMessage.sendDate.split("T")[0]}
                                                </span>
                                            </span>
                                            <span className="font-italic mb-0 text-small">
                                            </span>
                                        </span>
                                    </span>
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