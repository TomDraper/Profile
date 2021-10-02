using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Unity.Jobs;
using Unity.Entities;
using Unity.Transforms;
using Unity.Mathematics;
[AlwaysSynchronizeSystem]
public class _RulerTest : JobComponentSystem
{
  protected override JobHandle OnUpdate(JobHandle inputDeps)
  {
    Entities.WithoutBurst().WithStructuralChanges().ForEach((Entity e, ref Ruler ruler, in Translation trans ) => {
      if (!ruler.landed)
      {
        // NodeFinder is a helper class that does what it says on the tin.
        NodeInfo n = NodeFinder.FindClosestUnoccupiedNode(new Vector3 (trans.Value.x, trans.Value.y, trans.Value.z));
        // Move to the chosen node.
        EntityManager.AddComponent(e, typeof(MoveJob));
        MoveJob moveHere = new MoveJob {
          target = new float3(n.x, n.y, n.z),
          speed = 0.1f,
          arrived = false
        };
        EntityManager.SetComponentData(e, moveHere);
        Debug.Log("Ruler has been landed!");
        // Spawn in the flag and default elements of an Empire.
        // The flag serves as the 'capital city' and main entity of the Empire.
        Entity flag = EntityManager.Instantiate(ruler.capitalCityObject);
        float3 flagPos = new float3(n.x, n.y + ruler.capitalOffset, n.z);
        Translation flagTrans = new Translation {
          Value = flagPos
        };
        EntityManager.SetComponentData(flag, flagTrans);
        Empire newEmpire = new Empire {
          wealth = ruler.wealth,
          pawnType = ruler.pawnType,
          size = 10.0f
        };
        EmpireResources resources = new EmpireResources {
          wood = 0,
          berries = 0
        };
        // Give the flag the elements it needs to run itself.
        EntityManager.AddComponent(flag, typeof(Empire));
        EntityManager.SetComponentData(flag, newEmpire);
        EntityManager.AddComponent(flag, typeof(EmpireResources));
        EntityManager.SetComponentData(flag, resources);
        EntityManager.AddComponent(flag, typeof(SpawnRandomPawnJob));
        SpawnRandomPawnJob spawnJob = new SpawnRandomPawnJob {
          amount = ruler.startPawns
        };
        EntityManager.SetComponentData(flag, spawnJob);
        TakeoverNearbyLands takeOverNearbyLands = new TakeoverNearbyLands {
          center = flagPos,
          size = newEmpire.size
        };
        EntityManager.AddComponent(flag, typeof(TakeoverNearbyLands));
        EntityManager.SetComponentData(flag, takeOverNearbyLands);
        // We are now landed and other systems should be in place to handle the
        // Rulers actions.
        ruler.landed = true;
      }
    }).Run();
    return default;
  }
}
