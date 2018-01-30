var ObjectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher=require('../Dispatcher/TreeDispatcher.js');
var Tree=require('../Controller/TreeMainController.jsx');

const CHANGE_EVENT='change';

var data = [
  {
    id: 1,
    lable: 'Node1',
    sOwner: 'me',
    sLastModified: 'jan 18,2018 me',
    sType:'Folder',
    childrens: [
      {
        id: 5,
        lable: 'Untitled folder',
        sOwner: 'me',
        sLastModified: 'jan 19,2018 me',
        sType:'Folder',
        childrens: [],
        show: false
      },
      {
        id: 6,
        lable: 'Untitled folder',
        sOwner: 'me',
        sLastModified: 'jan 25,2018 me',
        sType:'Folder',
        childrens: [],
        show: false
      },
      {
        id: 55,
        lable: 'Untitled file',
        sOwner: 'me',
        sLastModified: 'jan 19,2018 me',
        sType:'File',
        childrens: [],
        show: false
      },
      {
        id: 66,
        lable: 'Untitled file',
        sOwner: 'me',
        sLastModified: 'jan 25,2018 me',
        sType:'File',
        childrens: [],
        show: false
      }
    ],
    show: false
  },
  {
    id: 2,
    lable: 'Node2',
    sOwner: 'me',
    sLastModified: 'jan 15,2018 me',
    sType:'Folder',
    childrens: [
      {
        id: 7,
        lable: 'Node2.1',
        sOwner: 'me',
        sLastModified: 'jan 18,2018 me',
        sType:'Folder',
        childrens: [
          {
            id: 11,
            lable: 'Node2.1.1',
            sOwner: 'me',
            sLastModified: 'jan 20,2018 me',
            sType:'Folder',
            childrens: [],
            show: false
          },
          {
            id: 12,
            lable: 'Node2.1.2',
            sOwner: 'me',
            sLastModified: 'jan 22,2018 me',
            sType:'Folder',
            childrens: [],
            show: false
          }
        ],
        show: false
      },
      {
        id: 8,
        lable: 'Node2.2',
        sOwner: 'me',
        sLastModified: 'jan 18,2018 me',
        sType:'Folder',
        childrens: [],
        show: false
      },
    ],
    show: false
  },
  {
    id: 3,
    lable: 'Node3',
    sOwner: 'me',
    sLastModified: 'jan 20,2018 me',
    sType:'Folder',
    childrens: [],
    show: false
  },
  {
    id: 4,
    lable: 'Node4',
    sOwner: 'me',
    sLastModified: 'jan 25,2018 me',
    sType:'Folder',
    childrens: [],
    show: false
  }
]

var oNode={};
var edit=false;
var addItem=false;
var sView='ListView';  //sView=Listview or GridView

var TreeStore = ObjectAssign(
    {},
    EventEmitter.prototype,
    {
      addChangeListener: function (setStateFunction) {
        this.on(CHANGE_EVENT, setStateFunction);
      },

      removeChangeListener: function (setStateFunction) {
        this.removeListener(CHANGE_EVENT, setStateFunction);
      },
      getTree: function () {
        return data;
      },

      getParentNode: function () {

        return oNode;
      },
      getEditStatus: function () {
        return edit;
      },
      getAddItemStatus: function () {
        return addItem;
      },
      getView: function () {
        return sView;
      }
    }
);

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {
    case 'SAVE_ITEM' :
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      var node = {
        id: idGenerator(),
        lable: action.sLable,
        sOwner:action.sOwner,
        sLastModified:date,
        sType:action.sType,
        childrens: [],
        show: true
      }
      if (oNode.id == null) {

        data.push(node);
        addItem = false;
        TreeStore.emit(CHANGE_EVENT);
      }
      else {
        oNode.childrens.push(node);
        addItem = false;
        TreeStore.emit(CHANGE_EVENT);
      }
      break;


    case 'SAVE_PARENT':
      if (oNode.id == action.node.id) {
        oNode = {};
      }
      else {
        oNode = action.node;
      }

      TreeStore.emit(CHANGE_EVENT);
      break;


    case 'REMOVE_ITEM':
      var queue = [];
      for (let i = 0; i < data.length; i++) {

        if (data[i].id == oNode.id) {
          data.splice(i, 1);
          oNode = {}
          TreeStore.emit(CHANGE_EVENT);
        }
        else {

          findNode(data[i]);
        }
      }
      oNode = {};
      TreeStore.emit(CHANGE_EVENT);
      break;


    case 'COLLAPSE':
      var queue = [];
      for (let i = 0; i < data.length; i++) {

        if (data[i].id == action.id) {
          if (data[i].childrens.length > 0) {
            data[i].show = false;
            TreeStore.emit(CHANGE_EVENT);
          }

          return;
        }
        else {
          findChildrens(action.id, data[i]);
          TreeStore.emit(CHANGE_EVENT);
        }
      }
      break;

    case 'EXPAND':
      var queue = [];
      for (let i = 0; i < data.length; i++) {

        if (data[i].id == action.id) {
          if (data[i].childrens.length > 0) {
            data[i].show = true;
            TreeStore.emit(CHANGE_EVENT);
          }
          return;
        }
        else {
          findChildrens(action.id, data[i]);
          TreeStore.emit(CHANGE_EVENT);
        }
      }
      break;
    case 'CHANGE_EDIT_STATE':
      edit = true;
      TreeStore.emit(CHANGE_EVENT);
      break;
    case 'CHANGE_ADD_ITEM_STATUS':
      if (addItem == false) {
        addItem = true;
        TreeStore.emit(CHANGE_EVENT);
      }
      else {
        addItem = false;
        TreeStore.emit(CHANGE_EVENT);
      }
      break;
    case 'SET_VIEW':
      sView=action.view;
      TreeStore.emit(CHANGE_EVENT);
      break;


  }
})

function findChildrens (id, node) {
  if (node != null) {
    if (node.id == id) {
      if (node.childrens.length > 0) {
        if (node.show == false) {
          node.show = true;
        }
        else {
          node.show = false;
        }
      }

      return
    }
    else {
      for (var i = 0; i < node.childrens.length; i++) {
        findChildrens(id, node.childrens[i]);
      }

    }
  }
}

function findNode (node) {
  if (node != null) {
    if (node.id == oNode.id) {
      return true
    }
    else {
      for (var i = 0; i < node.childrens.length; i++) {
        var flag = findNode(node.childrens[i]);

        if (flag == true) {
          node.childrens.splice(i, 1);
          if (node.childrens.length == 0) {
            node.show = false;
          }
          return
        }

      }

    }
  }
}

module.exports = TreeStore;