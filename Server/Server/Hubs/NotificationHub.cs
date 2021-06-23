using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Models.Entities;
using Server.Repositories.Imp;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Server.Hubs
{
    [Authorize]
    public class NotificationHub : Hub
    {
        private IRepositoryWrapper _repository;

        public NotificationHub(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        public override async Task OnConnectedAsync()
        {

            string userId = Context.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            string username = Context.User.Identity.Name;
            string id = username.Split('-')[1];        
            string role = _repository.User.GetUserRole(int.Parse(userId));
            long classId = 0;
            if (role == "teacher")
            {
                classId = _repository.Teacher.GetTeacherById(Int64.Parse(id)).classID;
            }
            else if(role == "parent")
            {
                long studentId = Int64.Parse(id);
                classId = _repository.Student.GetStudentById(studentId).classID;
            }
            string group = classId.ToString();
            await Groups.AddToGroupAsync(Context.ConnectionId, group);
            await base.OnConnectedAsync();
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }
    }
}
