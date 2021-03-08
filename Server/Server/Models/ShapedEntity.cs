using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class ShapedEntity
    {
		public ShapedEntity()
		{
			Entity = new Entity();
		}

		public long id { get; set; }
		public Entity Entity { get; set; }
	}
}
