var AppDispatcher=require('../Dispatcher/TreeDispatcher.js');

module.exports={
  addItem: function (sName, sOwner, sType) {
    AppDispatcher.handleViewAction
    (
        {
          actionType: 'SAVE_ITEM',
          sLable: sName,
          sOwner:sOwner,
          sType:sType
        }
    );
  },

    removeItem:function()
    {
        AppDispatcher.handleViewAction
        (
            {
                actionType:'REMOVE_ITEM'
            }
        );
    },
    setParentNode:function(oNode)
    {
        AppDispatcher.handleViewAction
        (
            {
                actionType:'SAVE_PARENT',
                node:oNode

            }
        );
    },

    collapse:function(parentId)
    {
        AppDispatcher.handleViewAction
        (
            {
                actionType:'COLLAPSE',
                id:parentId

            }
        );
    },

    expand:function(parentId)
    {
        AppDispatcher.handleViewAction
        (
            {
                actionType:'EXPAND',
                id:parentId

            }
        );
    },
    changeEditState:function()
    {
        AppDispatcher.handleViewAction
        (
            {
                actionType:'CHANGE_EDIT_STATE'
            }
        );
    },
    editNode:function()
    {
        AppDispatcher.handleViewAction
        (
            {
                actionType:'EDIT_NODE'
            }
        );
    },
    changeAddItemStatus:function () {
        AppDispatcher.handleViewAction
        (
            {

                actionType:'CHANGE_ADD_ITEM_STATUS'
            }
        );
    },
  setView:function (view) {
    AppDispatcher.handleViewAction
    (
        {
          actionType:'SET_VIEW',
          view:view
        }
    );
  }

}