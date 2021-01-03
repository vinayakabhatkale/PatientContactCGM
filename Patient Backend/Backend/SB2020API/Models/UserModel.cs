using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GS2020API.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public int RootId { get; set; }
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public string Password { get; set; }
        public bool isTempPassword { get; set; }
        public string Email { get; set; }
        public Int64 Mobile { get; set; }
        public string Entity { get; set; }
        public int EntityId { get; set; }
        public DateTime LastLoginDate { get; set; }
        public string DisplayName { get; set; }
        public string RoleCode { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int UpdatedBy { get; set; }
        public List<MenuModel> MenuList { get; set; }
        public List<ViewModel> ViewList { get; set; }

        public bool isquoteaccessible { get; set; }
    }
}
