using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Unity.Entities;
using Unity.Mathematics;
public struct MoveJob : IComponentData
{
  public float3 target;
  public float speed;
  public bool arrived;
}
