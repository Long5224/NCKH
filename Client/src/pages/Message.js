import React from "react";
import { Container } from "reactstrap";
import Header from "../components/UserHeader/Header";
export default function Message() {
  return (
    <>
      <Header />
      <Container className="mt--8">
        <div className="row rounded-lg overflow-hidden shadow">
          <div className="col-7 px-0">
            <div className="px-4 py-5 chat-box bg-white">
              <div className="media w-50 mb-3">
                <img
                  src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                  alt="user"
                  width="50"
                  className="rounded-circle"
                />
                <div className="media-body ml-3">
                  <div className="bg-light rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-muted">
                      Test which is a new approach all solutions
                    </p>
                  </div>
                  <p className="small text-muted">12:00 PM | Aug 13</p>
                </div>
              </div>

              <div className="media w-50 ml-auto mb-3">
                <div className="media-body">
                  <div className="bg-primary rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-white">
                      Test which is a new approach to have all solutions
                    </p>
                  </div>
                  <p className="small text-muted">12:00 PM | Aug 13</p>
                </div>
              </div>

              <div className="media w-50 mb-3">
                <img
                  src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                  alt="user"
                  width="50"
                  className="rounded-circle"
                />
                <div className="media-body ml-3">
                  <div className="bg-light rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-muted">
                      Test, which is a new approach to have
                    </p>
                  </div>
                  <p className="small text-muted">12:00 PM | Aug 13</p>
                </div>
              </div>

              <div className="media w-50 ml-auto mb-3">
                <div className="media-body">
                  <div className="bg-primary rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-white">
                      Apollo University, Delhi, India Test
                    </p>
                  </div>
                  <p className="small text-muted">12:00 PM | Aug 13</p>
                </div>
              </div>

              <div className="media w-50 mb-3">
                <img
                  src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                  alt="user"
                  width="50"
                  className="rounded-circle"
                />
                <div className="media-body ml-3">
                  <div className="bg-light rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-muted">
                      Test, which is a new approach
                    </p>
                  </div>
                  <p className="small text-muted">12:00 PM | Aug 13</p>
                </div>
              </div>

              <div className="media w-50 ml-auto mb-3">
                <div className="media-body">
                  <div className="bg-primary rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-white">
                      Apollo University, Delhi, India Test
                    </p>
                  </div>
                  <p className="small text-muted">12:00 PM | Aug 13</p>
                </div>
              </div>
            </div>

            <form action="#" className="bg-light">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Type a message"
                  aria-describedby="button-addon2"
                  className="form-control rounded-0 border-0 py-4 bg-light"
                />
                <div className="input-group-append">
                  <button
                    id="button-addon2"
                    type="submit"
                    className="btn btn-link"
                  >
                    {" "}
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-5 px-0 bg-white">
            <div className="bg-white">
              <div className="bg-gray px-4 py-2 bg-light">
                <p className="h5 mb-0 py-1">Recent</p>
              </div>
              <div className="messages-box">
                <div className="list-group rounded-0">
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
