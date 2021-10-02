using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Unity.Entities;
using Unity.Jobs;
using Unity.Mathematics;
using Unity.Transforms;
public class WalkTowardsTarget : ComponentSystem
{
  protected override void OnUpdate()
  {
    Entities.WithAll<MoveJob>().ForEach( (Entity e, ref MoveJob moveJob, ref Translation trans) => {
      Vector3 con1 = new Vector3 (moveJob.target.x, moveJob.target.y, moveJob.target.z);
      Vector3 con2 = new Vector3 (trans.Value.x, trans.Value.y, trans.Value.z);
      float distance = Vector3.Distance(con1, con2);
      if (distance <= 0.1) {
        moveJob.arrived = true;
      } else {
        Vector3 newPos = Vector3.MoveTowards(con2, con1, moveJob.speed);
        trans.Value = new float3(newPos.x, newPos.y, newPos.z);
      }
    });
  }
}
