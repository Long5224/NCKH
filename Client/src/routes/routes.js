import Index from '../pages/General-Info'
import Score from '../pages/Score'
import Study_Schedule from '../pages/Study_Schedule'
import Test_Schedule from '../pages/Test_Schedule'
import Notification from '../pages/Notification'
import Scholarship from '../pages/Scholarship'
import Teacher from '../pages/Teacher'
import ChangePassword from '../pages/ChangePassword'
import LoginPage from "../layout/Login"
var routes = [
    {
      path: "/index",
      name: "Thông tin chung",
      icon: "fas fa-home text-primary",
      component: Index,
      layout: "/home",
    },
    {
      path: "/score",
      name: "Điểm thi",
      icon: "far fa-chart-bar text-primary",
      component: Score,
      layout: "/home",
    },
    {
      path: "/study-schedule",
      name: "Lịch học",
      icon: "far fa-calendar-alt text-primary",
      component: Study_Schedule,
      layout: "/home",
    },
    {
      path: "/test-schedule",
      name: "Lịch thi",
      icon: "far fa-calendar-check text-primary",
      component: Test_Schedule,
      layout: "/home",
    },
    {
      path: "/notification",
      name: "Thông báo",
      icon: "far fa-bell text-primary",
      component: Notification,
      layout: "/home",
    },
    {
      path: "/scholarship",
      name: "Học bổng và Rèn luyện",
      icon: "fas fa-dumbbell text-primary",
      component: Scholarship,
      layout: "/home",
    },
    {
      path: "/teacher",
      name: "Cố vấn học tập",
      icon: "far fa-id-card text-primary",
      component: Teacher,
      layout: "/home",
    },
    {
        path: "/change-password",
        name: "Đổi mật khẩu",
        icon: "fas fa-cog text-primary",
        component: ChangePassword,
        layout: "/home",
      },
      {
        path: "/",
        name: "Đăng xuất",
        icon: "fas fa-sign-out-alt text-primary",
        component: LoginPage,
        layout: "/login",
      },
  ];
  export default routes;
  