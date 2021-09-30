using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

[Serializable]
public class Requirements : ScriptableObject
{
  // Other objects containing specific requirements.
  public Skill_Reqs skillReqs;
  public Character_Reqs characterReqs;
  // Contacts and items need to be in lists.
  public List<Contact_Reqs> contactReqs;
  public List<Item_Reqs> itemReqs = new List<Item_Reqs>();

  // A function to check if the player passes ALL requirements.
  // Each other req object handles their own pass/fail but you must cycle through
  // The ones you have.
  public bool Passes(Player_Character pc)
  {
    if(!skillReqs.Passes(pc)){
      return false;
    } else if (!characterReqs.Passes(pc)){
      return false;
    }
    foreach(Contact_Reqs cr in contactReqs){
      if (!cr.Passes(pc)){
        return false;
      }
    }
    return true;
  }

  // Check whether a requirement is equal or lower than another requirement.
  // This allows pooling later on.
  public bool EqualOrLower(Requirements other) {
    if (other == this)
      return true;
    bool val = skillReqs.EqualOrLower(other.skillReqs);
    val = characterReqs.EqualOrLower(other.characterReqs);
    val = EqualOrLowerContacts(other.contactReqs);
    return val;
  }
  // Extension to the equal or lower function above.
  public bool EqualOrLowerContacts(List<Contact_Reqs> others){
    foreach(Contact_Reqs req1 in contactReqs){
      Contact c1 = req1.contact;
      bool found = false;
      foreach(Contact_Reqs req2 in others)
      {
        if (c1 == req2.contact){
          if (req2.requiredFriendshipLevel >= req1.requiredFriendshipLevel){
            found = true;
            break;
          } else {
            return false;
          }
        }
      }
      if (!found){
        return false;
      }
    }
    return true;
  }
}
