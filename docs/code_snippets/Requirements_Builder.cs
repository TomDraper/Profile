using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

public class Requirements_Builder : EditorWindow
{
  public GUISkin skin;
  // Currently active requirements objects.
  Skill_Reqs skillReqs;
  Character_Reqs characterReqs;
  List<Contact_Reqs> contactReqs;
  List<Item_Reqs> itemReqs;
  // Strings of the possible save points.
  public string[] fileStrings = new string[3];
  EditorWindow instance;

  [MenuItem ("Window/Requirements Builder")]
  public static void  ShowWindow () {
      EditorWindow instance = EditorWindow.GetWindow(typeof(Requirements_Builder));
      instance.maxSize = new Vector2(512, 916);
  }

  private void ResetObjects()
  {
    skillReqs = new Skill_Reqs();
    characterReqs = new Character_Reqs();
    contactReqs = new List<Contact_Reqs>();
    itemReqs = new List<Item_Reqs>();
    loadedObject = false;
  }

  bool loadedObject = false; // If req object is already loaded.
  string loadedPath = ""; // Where that loaded objects path is.

  // Drop-Down flags.
  bool showSkillReqs = false;
  bool showCharacterReqs = false;
  bool showContactReqs = false;
  bool showItemReqs = false;

  Vector2 scrollPos = new Vector2(0, 0);
  public void OnGUI()
  {
    GUI.skin = skin;
    EditorGUILayout.Space();
    GUILayout.Label("Requirements Builder", EditorModules.title());
    EditorGUILayout.Space();
    scrollPos = EditorGUILayout.BeginScrollView(scrollPos);
    if (skillReqs == null || characterReqs == null|| contactReqs == null){
      ResetObjects();
    }
    if (loadedObject){
      EditorGUILayout.HelpBox("OBJECT IS LIVE", MessageType.Warning);
      GUILayout.Label(loadedPath);
    }
    if (GUILayout.Button("Reset")) {
      ResetObjects();
    }

    showSkillReqs = EditorGUILayout.Foldout(showSkillReqs, "Skill Requirements", true);
    if(showSkillReqs){
      EditorModules.DrawEditableSkillReqs(skillReqs);
    }
    showCharacterReqs = EditorGUILayout.Foldout(showCharacterReqs, "Character Requirements", true);
    if(showCharacterReqs){
      EditorModules.DrawEditableCharacterReqs(characterReqs);
    }
    showContactReqs = EditorGUILayout.Foldout(showContactReqs, "Contact Requirements", true);
    if(showContactReqs){
      EditorModules.DrawContactReqList(contactReqs);
    }
    showItemReqs = EditorGUILayout.Foldout(showItemReqs, "Item Requirements", true);
    if(showItemReqs){
      EditorModules.DrawItemReqList(itemReqs);
    }
    fileStrings = EditorModules.DrawSaveLoadUtility("req", fileStrings, Save, Load, ResetObjects);
    EditorGUILayout.EndScrollView();
  }

  private bool Load(string path)
  {
    path = "Assets" + path.Substring(Application.dataPath.Length);
    Requirements asset = (Requirements)AssetDatabase.LoadAssetAtPath<Requirements>(path);
    skillReqs = asset.skillReqs;
    contactReqs = asset.contactReqs;
    contactReqs = asset.contactReqs;
    loadedPath = path;
    loadedObject = true;
    return true;
  }
  private bool Save(string path)
  {
    Requirements asset = (Requirements)ScriptableObject.CreateInstance(typeof(Requirements));
    asset.skillReqs = skillReqs;
    asset.characterReqs = characterReqs;
    asset.contactReqs = contactReqs;
    path = "Assets/" + path.Substring(Application.dataPath.Length);
    path = AssetDatabase.GenerateUniqueAssetPath(path);
    AssetDatabase.CreateAsset(asset, path);
    loadedPath = path;
    loadedObject = true;
    return true;
  }

}
