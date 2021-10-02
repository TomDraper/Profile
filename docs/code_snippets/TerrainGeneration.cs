using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Unity.Entities;
using Unity.Rendering;
using Unity.Mathematics;
using Unity.Transforms;
[RequireComponent(typeof(MeshFilter))]
public class TerrainGeneration : MonoBehaviour
{
  // Work in x and z because Unity.
  public int zSize;
  public int xSize;
  // Keep the magnification somewhat reasonable.
  [Range(0.01f, 0.3f)]
  public float perlinMag;
  // noise(x, y) = 1 = max_height
  public float maxHeight;
  // Offsets can be used to place the terrain differently from it's node.
  public float zOffset;
  public float xOffset;
  // The gradient we will be using to colour the terrain.
  public Gradient grad;
  // Draw small spheres at each vert along the current terrain.
  public bool debugControls;
  // Properties of the mesh that is generated.
  Vector3[] verts;
  int[] tris;
  Vector2[] uvs;
  Color[] colors;
  Mesh mesh;

  private void Start()
  {
    mesh = new Mesh();
    GetComponent<MeshFilter>().mesh = mesh;
    GenerateMesh();
    UpdateMesh();
    UpdateNodeEntities();
    UpdateMesh();
  }

  float prevxoff;
  float prevzoff;
  GradientColorKey[] prevgrad;
  private void Update()
  {
    if (prevxoff != xOffset || prevzoff != zOffset || grad.colorKeys != prevgrad) {
      GenerateMesh();
      UpdateMesh();
      ConvertMeshToEntity();
    }
    prevxoff = xOffset;
    prevzoff = zOffset;
    prevgrad = grad.colorKeys;
  }

  public void GenerateMesh(){
    Vector3[] vertices = new Vector3[(zSize+1) * (xSize+1)];
    // There is no good reason for i and z to not be used interchangeably. :/
    // Create a bunch of vertices along a plane with their y value being based on noise.
    for (int i = 0, z = 0; z <= zSize; z++) {
      for (int x = 0; x <= xSize; x++) {
        float ylevel = Mathf.PerlinNoise((xOffset + x) * perlinMag, (zOffset + z) * perlinMag);
        vertices[i] = new Vector3(x, ylevel * maxHeight, z);
        i++;
      }
    }
    // Add the triangles based on the INDEX of the vertices.
    int v = 0;
    int t = 0;
    int[] triangles = new int[zSize * xSize * 6];
    for (int z = 0; z < zSize; z++){
      for (int x = 0; x < xSize; x++) {
        triangles[t] = v + 0;
        triangles[t+1] = v + zSize + 1;
        triangles[t+2] = v + 1;
        triangles[t+3] = v + 1;
        triangles[t+4] = v + zSize + 1;
        triangles[t+5] = v + zSize + 2;
        v++;
        t += 6;
      }
      v++;
    }
    // Create the uvs and then an appropriate colour based on it's height.
    // Uvs is verts.xz converted to 0-1 space, this does cause distortion but is cheap.
    uvs = new Vector2[vertices.Length];
    colors = new Color[vertices.Length];
    for (int i = 0, z = 0; z <= zSize; z++) {
      for (int x = 0; x <= xSize; x++) {
        uvs[i] = new Vector2((float)x / xSize, (float)z / zSize);
        float h = Mathf.InverseLerp(0, maxHeight, vertices[i].y);
        colors[i] = grad.Evaluate(h);
        i++;
      }
    }
    verts = vertices;
    tris = triangles;
  }
// Clear the current mesh and update it to the newly generated one.
  public void UpdateMesh()
  {
    mesh.Clear();
    mesh.vertices = verts;
    mesh.triangles = tris;
    mesh.uv = uvs;
    mesh.colors = colors;
    mesh.RecalculateNormals();

  }
// Used to give each vert 'information' it may need. In this case how many berries and wood they have.
// It also adds an occupied flag for Rulers to toggle.
  private void UpdateNodeEntities()
  {
    EntityManager em = World.DefaultGameObjectInjectionWorld.EntityManager;
    EntityArchetype archetype = em.CreateArchetype(
      typeof(NodeInfo),
      typeof(NodeSurfaceMaterials)
    );
    foreach (Vector3 vert in verts)
    {
      bool o = false;
      if (UnityEngine.Random.value < 0.5) {
        o = true;
      }
      NodeInfo pos = new NodeInfo {
        x = vert.x,
        y = vert.y,
        z = vert.z,
        occupied = o
      };
      NodeSurfaceMaterials mats = new NodeSurfaceMaterials {
        wood = 100,
        berries = 100
      };
      Entity e = em.CreateEntity(archetype);
      em.SetComponentData(e, pos);
      em.SetComponentData(e, mats);
    }


  }

  private void OnDrawGizmos()
  {
    // If there is no verts or we don't want to show the debug controls then return.
    if (verts == null) { return; }
    if (debugControls == false) { return; }
    // Otherwise draw a sphere at each vert (We can't draw terrain - ECS).
    for (int i = 0; i < verts.Length; i++)
    {
      Gizmos.DrawSphere(verts[i], .1f);
    }
  }
}
