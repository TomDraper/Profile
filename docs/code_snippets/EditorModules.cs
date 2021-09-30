using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using System;

// To keep things consistent use this class when you need to draw something
// that is commonly repeated elsewhere.

// Much of them follow the same pattern of drawing each objects variable in some
// manner. The exceptions being contacts and items which because of them being
// lists must first go through every object and draw that objects variables.

// The drawing of the Save/Load utility handles everything for you, but you
// must provide a function that provides the logic for saving/loading an item.
// For example: save(){ asset.variable = MyBuilder.variable_delegate }
public static class EditorModules
{
  // Title text.
  public static GUIStyle title(){
    return GUI.skin.customStyles[4];
  }

  public static void DrawHorizontalLine()
  {
    GUILayout.Label("", GUI.skin.customStyles[3]);
  }

  public static void DrawEditableSkillReqs(Skill_Reqs s) {
    s.strength = EditorGUILayout.IntSlider("Strength Required", s.strength, 0, 10);
    s.intelligence = EditorGUILayout.IntSlider("Intelligence Required", s.intelligence, 0, 10);
    s.charisma = EditorGUILayout.IntSlider("Charisma Required", s.charisma,  0, 10);
  }

  public static void DrawEditableCharacterReqs(Character_Reqs c) {
    c.minAge = EditorGUILayout.IntSlider("Min Age Required", c.minAge, 0, c.maxAge);
    c.maxAge = EditorGUILayout.IntSlider("Max Age Required", c.maxAge, c.minAge, 110);
  }

  public static void DrawContactReqList(List<Contact_Reqs> reqs)
  {
    if (GUILayout.Button("Add Contact")){
      reqs.Add(new Contact_Reqs());
    }
    List<Contact_Reqs> markedForRemoval = new List<Contact_Reqs>();
    foreach(Contact_Reqs req in reqs) {
      if(DrawEditableContactReqs(req)){
        markedForRemoval.Add(req);
      }
    }
    foreach(Contact_Reqs req in markedForRemoval)
    {
      reqs.Remove(req);
    }
  }
// Returns true if an object is to be removed. Used by above.
  private static bool DrawEditableContactReqs(Contact_Reqs reqs) {
    reqs.contact = (Contact)EditorGUILayout.ObjectField("Contact", reqs.contact, typeof(Contact), false);
    if (reqs.contact != null){
      reqs.requiredFriendshipLevel = EditorGUILayout.IntSlider("Friendship Needed", reqs.requiredFriendshipLevel, -100, 100);
    }
    if (GUILayout.Button("X")){
      return true;
    } else {
      return false;
    }
  }
  public static void DrawItemReqList(List<Item_Reqs> reqs)
  {
    if (GUILayout.Button("Add Item")){
      reqs.Add(new Item_Reqs());
    }
    List<Item_Reqs> markedForRemoval = new List<Item_Reqs>();
    foreach(Item_Reqs req in reqs) {
      if(DrawEditableItemReqs(req)){
        markedForRemoval.Add(req);
      }
    }
    foreach(Item_Reqs req in markedForRemoval) {
      reqs.Remove(req);
    }
  }
  private static bool DrawEditableItemReqs(Item_Reqs reqs) {
    reqs.item = (Item)EditorGUILayout.ObjectField("Item", reqs.item, typeof(Item), false);
    if (reqs.item != null){
      if (reqs.item.maxAmount == 1){
        GUILayout.Label(reqs.item.name + " x1");
      } else if (reqs.item.maxAmount == -1) {
        reqs.amountNeeded = EditorGUILayout.IntField("Amount Needed", reqs.amountNeeded);
      } else {
        reqs.amountNeeded = EditorGUILayout.IntSlider("Amount Needed", reqs.amountNeeded, 1, reqs.item.maxAmount);
      }
    }
    if (GUILayout.Button("X")){
      return true;
    } else {
      return false;
    }
  }

  private static bool DrawAnswer(Answer a){
    if (a != null) {
      GUILayout.Label("Main text will read: " + a.mainText);
      GUILayout.Label("The reaction will read: " + a.reaction);
      GUILayout.BeginHorizontal();
      if (GUILayout.Button("View Answer")){
        Selection.SetActiveObjectWithContext(a, a);
      }
      if (GUILayout.Button("View Reqs")){
        Selection.SetActiveObjectWithContext(a.reqs, a.reqs);
      }
      GUILayout.EndHorizontal();
    }
    if (GUILayout.Button("X")) {
      return true;
    } else {
      return false;
    }
  }
  public static void DrawEditableAnswers(List<Answer> possibleAnswers) {
    if (GUILayout.Button("Add Answer")){
      possibleAnswers.Add(null);
    }
    List<Answer> currentList = new List<Answer>(possibleAnswers);
    List<Answer> markedForRemoval = new List<Answer>();
    int i = 0;
    foreach(Answer a in currentList) {
      possibleAnswers[i] = (Answer)EditorGUILayout.ObjectField(possibleAnswers[i], typeof(Answer), false);
      if (DrawAnswer(possibleAnswers[i])){
        markedForRemoval.Add(a);
      }
      i++;
    }
    foreach(Answer a in markedForRemoval)
    {
      possibleAnswers.Remove(a);
    }
  }

  private static bool DrawContact(Contact c) {
    if (c != null){
      GUILayout.Label(String.Format("{0}, aged {1}. Described as: {2}", c.name, c.age, c.description));
    }
    if (GUILayout.Button("X")){
      return true;
    } else {
      return false;
    }
  }

  public static void DrawContactList(List<Contact> contacts)
  {
    if (GUILayout.Button("Add Contact")){
      contacts.Add(null);
    }
    List<Contact> currentList = new List<Contact>(contacts);
    List<Contact> markedForRemoval = new List<Contact>();
    int i = 0;
    foreach(Contact c in currentList) {
      contacts[i] = (Contact)EditorGUILayout.ObjectField(contacts[i], typeof(Contact), false);
      if (DrawContact(contacts[i])){
        markedForRemoval.Add(c);
      }
      i++;
    }
    foreach(Contact c in markedForRemoval)
    {
      contacts.Remove(c);
    }
  }

  public static bool DrawItemChangeInfo(ItemChangeInfo info){
    if (info.item != null)
    {
      int max = info.item.maxAmount;
      if (max == -1){
        info.amountToAdd = EditorGUILayout.IntField("Amount to add ", info.amountToAdd);
      } else {
        info.amountToAdd = EditorGUILayout.IntSlider(info.amountToAdd, -info.item.maxAmount, info.item.maxAmount);
      }
      info.newDescription = EditorGUILayout.TextField("New Description", info.newDescription);
      info.historyString = EditorGUILayout.TextField("History String", info.historyString);
    }
    if (GUILayout.Button("X")){
      return true;
    } else {
      return false;
    }
  }
  public static void ShowItemChanges(List<ItemChangeInfo> info)
  {
    if (GUILayout.Button("Add Item Change")){
      info.Add(new ItemChangeInfo());
    }
    List<ItemChangeInfo> currentList = new List<ItemChangeInfo>(info);
    List<ItemChangeInfo> markedForRemoval = new List<ItemChangeInfo>();
    int i = 0;
    foreach(ItemChangeInfo c in currentList) {
      info[i].item = (Item)EditorGUILayout.ObjectField(info[i].item, typeof(Item), false);
      if (DrawItemChangeInfo(c)){
        markedForRemoval.Add(c);
      }
      i++;
    }
    foreach(ItemChangeInfo c in markedForRemoval)
    {
      info.Remove(c);
    }
  }
  public static bool DrawContactChangeInfo(ContactChangeInfo info){
    info.anyContact = EditorGUILayout.Toggle("Any contact they're with?", info.anyContact);
    if (info.anyContact){
      info.contact = null;
      info.friendshipChange = EditorGUILayout.IntSlider("Friendship Change ", info.friendshipChange, -100, 100);
      info.historyString = EditorGUILayout.TextField("History", info.historyString);
    } else {
      info.contact = (Contact)EditorGUILayout.ObjectField(info.contact, typeof(Contact), false);
      info.friendshipChange = EditorGUILayout.IntSlider("Friendship Change ", info.friendshipChange, -100, 100);
      info.historyString = EditorGUILayout.TextField("History", info.historyString);
    }
    if (GUILayout.Button("X")){
      return true;
    } else {
      return false;
    }
  }

  public static void ShowContactChanges(List<ContactChangeInfo> info)
  {
    if (GUILayout.Button("Add Contact Change")){
      info.Add(new ContactChangeInfo());
    }
    List<ContactChangeInfo> currentList = new List<ContactChangeInfo>(info);
    List<ContactChangeInfo> markedForRemoval = new List<ContactChangeInfo>();
    int i = 0;
    foreach(ContactChangeInfo c in currentList) {
      //info[i].contact = (Contact)EditorGUILayout.ObjectField(info[i].contact, typeof(Contact), false);
      if (DrawContactChangeInfo(c)){
        markedForRemoval.Add(c);
      }
      i++;
    }
    foreach(ContactChangeInfo c in markedForRemoval)
    {
      info.Remove(c);
    }
  }

  public static void ShowSkillChanges(SkillChangeInfo info)
  {
    info.strength = EditorGUILayout.IntSlider("Strength", info.strength, -10, 10);
    info.intelligence = EditorGUILayout.IntSlider("Intelligence", info.intelligence, -10, 10);
    info.charisma = EditorGUILayout.IntSlider("Charisma", info.charisma, -10, 10);
  }


  public delegate bool SaveFileFunction(string s);
  public delegate bool LoadFileFunction(string s);
  // Used by the quick save to reset.
  public delegate void ResetFileFunction();
  // Returns [ destination folder , open file directory, saved object path ]
  public static string[] DrawSaveLoadUtility(string fileName, string[] previous, SaveFileFunction save, LoadFileFunction load, ResetFileFunction reset)
  {
    GUILayout.Label("Destination Path: " + previous[0]);
    GUILayout.BeginHorizontal();
    if (GUILayout.Button("Set Destination Folder")){
      previous[0] = EditorUtility.OpenFolderPanel("Open Folder", "", "asset");
    }
    if (GUILayout.Button("Quick Save")){
      if (previous[0] != ""){
        string p = previous[0] + "/" + fileName + ".asset";
        if (save(p)){
          reset();
        }
      }
    }
    GUILayout.EndHorizontal();
    GUILayout.BeginHorizontal();
    if (GUILayout.Button("Open File")){
      previous[1] = EditorUtility.OpenFilePanel("Open File", "", "asset");
      load(previous[1]);
    }
    if (GUILayout.Button("Save File")){
      previous[2] = EditorUtility.SaveFilePanel("Save File", previous[0], "", "asset");
      save(previous[2]);
    }
    GUILayout.EndHorizontal();

    string[] s = new string[3] {
      previous[0], previous[1], previous[2]
    };
    return s;
  }

  public static void QuickSave(string path, SaveFileFunction save, ResetFileFunction reset){
    if (path != ""){
      if (save(path)){
        Debug.Log("Object successfully saved at " + path);
        reset();
      } else {
        Debug.Log("Object failed to save.");
      }
    }
  }
}
