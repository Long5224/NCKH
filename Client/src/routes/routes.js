import Index from "../pages/General-Info";
import Score from "../pages/Score";
import Study_Schedule from "../pages/Study_Schedule1";
import Test_Schedule from "../pages/Test_Schedule";
import Notification from "../pages/Notification";
import Scholarship from "../pages/Scholarship";
import Teacher from "../pages/Teacher";
import ChangePassword from "../pages/ChangePassword";
import LoginPage from "../pages/Login";
import Students from "../pages/Students"
import Message from "../pages/Message"
import Statistics from "../pages/Statistics";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ForgotPasswordConFirmation from "../pages/ForgotPasswordConFirmation";
import ResetPasswordSuccess from "../pages/ResetPasswordSuccess";
var routes = [
  {
    path: "/general",
    name: "Thông tin chung",
    icon: "fas fa-home text-primary",
    component: Index,
    layout: "/home",
    role: ["student", "teacher", "parent"]
  },
  {
    path: "/score",
    name: "Điểm thi",
    icon: "far fa-chart-bar text-primary",
    component: Score,
    layout: "/home",
    role: ["student", "parent"]
  },
  {
    path: "/message",
    name: "Nhắn tin",
    icon: "fas fa-sms text-primary",
    component: Message,
    layout: "/home",
    role: ["student", "teacher", "parent"]
  },
  {
    path: "/students",
    name: "Danh sách sinh viên",
    icon: "fas fa-list-ol text-primary",
    component: Students,
    layout: "/home",
    role: ["teacher"]
  },
  {
    path: "/statistics",
    name: "Thống kê phổ điểm",
    icon: "fas fa-chart-bar text-primary",
    component: Statistics,
    layout: "/home",
    role: ["teacher"]
  },
  {
    path: "/study-schedule",
    name: "Lịch học",
    icon: "far fa-calendar-alt text-primary",
    component: Study_Schedule,
    layout: "/home",
    role: ["student", "parent"]
  },
  {
    path: "/test-schedule",
    name: "Lịch thi",
    icon: "far fa-calendar-check text-primary",
    component: Test_Schedule,
    layout: "/home",
    role: ["student", "parent"]
  },
  {
    path: "/notification",
    name: "Thông báo",
    icon: "far fa-bell text-primary",
    component: Notification,
    layout: "/home",
    role: ["student", "teacher", "parent"]
  },
  {
    path: "/scholarship",
    name: "Thông tin khác",
    icon: "fas fa-info text-primary",
    component: Scholarship,
    layout: "/home",
    role: ["student", "parent"]
  },

  {
    path: "/teacher",
    name: "Cố vấn học tập",
    icon: "far fa-id-card text-primary",
    component: Teacher,
    layout: "/home",
    role: ["student", "parent"]
  },
  {
    path: "/change-password",
    name: "Đổi mật khẩu",
    icon: "fas fa-cog text-primary",
    component: ChangePassword,
    layout: "/home",
    role: ["student", "teacher", "parent"]

  },
  {
    path: "/login",
    name: "Đăng nhập",
    icon: "fas fa-sign-out-alt text-primary",
    component: LoginPage,
    layout: "/auth",
    role: ["none"]
  },
  {
    path: "/forgot",
    name: "Quên mật khẩu",
    icon: "fas fa-sign-out-alt text-primary",
    component: ForgotPassword,
    layout: "/auth",
    role: ["none"]
  },

  {
    path: "/reset",
    name: "Đặt lại mật khẩu",
    icon: "fas fa-sign-out-alt text-primary",
    component: ResetPassword,
    layout: "/auth",
    role: ["none"]
  },

  {
    path: "/forgotpasswordconfirmation",
    name: "Xác nhận quên mật khẩu",
    icon: "fas fa-sign-out-alt text-primary",
    component: ForgotPasswordConFirmation,
    layout: "/auth",
    role: ["none"]
  },

  {
    path: "/resetpasswordsuccess",
    name: "Thay đổi mật khẩu thành công",
    icon: "fas fa-sign-out-alt text-primary",
    component: ResetPasswordSuccess,
    layout: "/auth",
    role: ["none"]
  },
];
export default routes;
