/*
  Developed By: Md.Harun-Ur-Rashid
  Country     : Bangladesh
  Github      : http://github.com/haruncpi
*/

"use strict";

function lsCollection(keyName) {
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
    return this.getAll().find(function (obj) {
      return obj._id == _id
    })
  },

  findWhere: function (findObj) {
    if (typeof findObj !== 'object') throw "object required, given " + typeof findObj;
    var items = this.getAll();

    return items.find(function (item) {
      return Object.keys(findObj).every(function (key) {
        return item[key] == findObj[key]
      })
    })
  },

  where: function (findObj) {
    if (typeof findObj !== 'object') throw "object required, given " + typeof findObj;
    var items = this.getAll();

    var result = items.find(function (item) {
      return Object.keys(findObj).every(function (key) {
        return item[key] == findObj[key]
      })
    })

    return result == undefined ? [] : result;

  },

  insert: function (obj) {
    if (typeof obj !== 'object') throw "object required, given " + typeof obj;
    var items = this.getAll()
    var generatedId = this.generateId()

    obj._id = generatedId

    items.push(obj)
    localStorage.setItem(this.keyName, JSON.stringify(items))

    return obj;

  },

  update: function (_id, updateData) {
    var items = this.getAll()
    var index = items.findIndex(function (item) {
      return item._id == _id;
    });

    if (index !== -1) {
      updateData._id = _id
      items[index] = updateData;
      localStorage.setItem(this.keyName, JSON.stringify(items));

      return updateData;
    } else {
      return false;
    }
  },

  delete: function (_id) {
    var items = this.getAll()
    var index = items.findIndex(function (item) {
      return item._id == _id;
    });

    if (index !== -1) {
      items.splice(index, 1);
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