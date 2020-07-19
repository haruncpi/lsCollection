/*
  Developed By: Md.Harun-Ur-Rashid
  Country     : Bangladesh
  Github      : http://github.com/haruncpi
*/

"use strict";

function lsCollection(keyName) {
  if (!window._) throw "underscore js required";
  if (!keyName || keyName === '') throw "a key name required for data sotre"

  this.keyName = keyName
}

lsCollection.prototype = {
  generateId: function () {
    return Date.now()
  },
  
  getAll: function () {
    var items = localStorage.getItem(this.keyName);
    items = JSON.parse(items);
    if (items)
      return items;
    else
      return [];
  },
  
  find: function (_id) {
    var items = localStorage.getItem(this.keyName)
    var findObj = {
      _id: _id
    }
    items = JSON.parse(items)

    return _.findWhere(items, findObj)
  },

  
  findWhere: function (findObj) {
    if (typeof findObj !== 'object') throw "object required, given " + typeof findObj;
    var items = localStorage.getItem(this.keyName)
    items = JSON.parse(items)

    return _.findWhere(items, findObj)
  },
  
  where: function (findObj) {
    if (typeof findObj !== 'object') throw "object required, given " + typeof findObj;
    var items = localStorage.getItem(this.keyName)
    items = JSON.parse(items)

    return _.where(items, findObj)
  },
  
  insert: function (saveValue) {
    var items = this.getAll()
    var generatedId = this.generateId()

    saveValue._id = generatedId

    items.push(saveValue)
    localStorage.setItem(this.keyName, JSON.stringify(items))

    return saveValue;

  },
  
  update: function (_id, updateData) {
    var items = this.getAll()
    var findObj = {
      _id: _id
    }

    if (_.findWhere(items, findObj)) {
      updateData._id = _id
      _.extend(_.findWhere(items, findObj), updateData);
      localStorage.setItem(this.keyName, JSON.stringify(items));

      return updateData;
    } else {
      return false;
    }
  },
  
  delete: function (_id) {
    var items = localStorage.getItem(this.keyName)
    var findObj = {
      _id: _id
    }
    items = JSON.parse(items)

    if (_.findWhere(items, findObj)) {
      items = _.without(items, _.findWhere(items, findObj))
      localStorage.setItem(this.keyName, JSON.stringify(items))
      return true
    } else {
      return false
    }
  },
  
  flash: function () {
    localStorage.setItem(this.keyName, null)
    console.log("all data has been flased from " + this.keyName)
  }

}