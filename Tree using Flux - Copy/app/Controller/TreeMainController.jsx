var React = require('react');
var TreeStore = require('../Store/TreeStore.js');
var TreeView = require('../View/TreeView.jsx');
var TopBarView = require('../View/TopBarView.jsx');
var ListView = require('../View/ListView.jsx');
var AddItemView = require('../View/AddItemView.jsx');
var GridView=require('../View/GridView.jsx');

class Tree extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: TreeStore.getTree(),
      selectedNode: TreeStore.getParentNode(),
      editStatus: TreeStore.getEditStatus(),
      addItemStatus: TreeStore.getAddItemStatus(),
      view: TreeStore.getView()
    };
    this._onCahnge = this._onCahnge.bind(this);
    this.getAddItemView = this.getAddItemView.bind(this);
    this.getView = this.getView.bind(this);
  }

  componentDidMount () {
    TreeStore.addChangeListener(this._onCahnge);
  }

  componentWillUnmount () {

  }

  _onCahnge () {
    this.setState({
      data: TreeStore.getTree(),
      selectedNode: TreeStore.getParentNode(),
      editStatus: TreeStore.getEditStatus(),
      addItemStatus: TreeStore.getAddItemStatus(),
      view: TreeStore.getView()
    });
  }

  getAddItemView () {
    if (this.state.addItemStatus == true) {
      return (<AddItemView/>);
    }
  }

  getView(){
    if(this.state.view=='ListView'){
      return(<ListView selectedNode={this.state.selectedNode}/>)
    }
    else{
      return(<GridView selectedNode={this.state.selectedNode}/>)
    }
  }


  render () {
    return (
        <div>
          <TopBarView selectedNode={this.state.selectedNode} view={this.state.view}/>
          <div className='TreeViewContainer'>
            <TreeView data={this.state.data} selectedNode={this.state.selectedNode}
                      editStatus={this.state.editStatus} padding={10}/>
          </div>
          {
            this.getView()
          }
          {

            this.getAddItemView()
          }

        </div>
    );
  }
}

module.exports = Tree;