var React = require('react');
var IdGenerator = require('../IdGenerator.js')
var Action = require('../Action/TreeAction.js')

var padding = 100;

class TreeView extends React.Component {

  constructor (props) {
    super(props)
    this.holdNode = this.holdNode.bind(this);
    this.collapse = this.collapse.bind(this);
    /*this.getCollapseIcon = this.getCollapseIcon.bind(this);
    this.getExpandIcon = this.getExpandIcon.bind(this);*/
    this.getItem = this.getItem.bind(this);
    this.getTreeView = this.getTreeView.bind(this);
    this.state = {bcolor: 'white'}
  }

  holdNode (oNode) {
    Action.setParentNode(oNode);
  }

  collapse (nodeId) {
    Action.collapse(nodeId);
  }

  expand (nodeId) {
    Action.expand(nodeId);
  }

  /* getCollapseIcon (node) {
     if (node.childrens.length > 0) {
       return (
           <img className="collapse" id='collapse' onClick={this.collapse.bind(this, node.id)} height='20' width='20'
                src='app/Media/Collapse.png'/>
       );
     }
   }*/

  /*getExpandIcon (node) {
    if (node.childrens.length > 0) {
      return (
          <img className="expand" id='expand' height='20' width='20' onClick={this.expand.bind(this, node.id)}
               src='app/Media/Expand.png'/>
      );
    }
  }*/

  getItem (oChildrens, iPadding) {

    if (oChildrens != null) {
      return (<TreeView data={oChildrens} selectedNode={this.props.selectedNode} padding={iPadding + 30}/>);
    }
  }

  getTreeView () {
    return (
        this.props.data.map((node) => {

          if (node.show == true) {
            if (this.props.selectedNode.id == node.id) {
              return (
                  <div>
                    <div style={{backgroundColor: '#e4e4e4'}} className='item'>
                      <li style={{paddingLeft: this.props.padding}}>
                        <img className="collapse" id='collapse' onClick={this.collapse.bind(this, node.id)} height='20'
                             width='20'
                             src='app/Media/Collapse.png'/>
                        <span onClick={this.holdNode.bind(this, node)} className='itemSpan'>
                                                <img height='20' width='20' src='app/Media/folder2.png'/>
                                                <span className='lableSpan'>{node.lable}</span>

                                            </span>
                      </li>
                    </div>
                    <div>
                      {
                        this.getItem(node.childrens, this.props.padding)

                      }
                    </div>
                  </div>
              );
            }
            else {
              return (
                  <div>

                    <div className='item'>
                      <li style={{paddingLeft: this.props.padding}}>
                        <img className="collapse" id='collapse' onClick={this.collapse.bind(this, node.id)} height='20'
                             width='20'
                             src='app/Media/Collapse.png'/>
                        <span onClick={this.holdNode.bind(this, node)} className='itemSpan'>
                                                <img height='15' width='20' src='app/Media/image1.png'/>
                                                <span className='lableSpan'>{node.lable}</span>
                                            </span>
                      </li>
                    </div>
                    <div>
                      {
                        this.getItem(node.childrens, this.props.padding)
                      }
                    </div>
                    {/* <TreeItem data={node} selectedNode={this.props.selectedNode} editStatus={this.props.editStatus}
                                    padding={30}/>*/}

                  </div>
              );
            }

          }
          else {
            if (this.props.selectedNode.id == node.id) {
              return (
                  <div style={{backgroundColor: '#e4e4e4'}} className='item'>

                    <li style={{paddingLeft: this.props.padding}}>
                      <img className="expand" id='expand' height='20' width='20'
                           onClick={this.expand.bind(this, node.id)}
                           src='app/Media/Expand.png'/>
                      <span onClick={this.holdNode.bind(this, node)} className='itemSpan'>
                    <img height='20' width='20' src='app/Media/folder2.png'/>
                    <span className='lableSpan'>{node.lable}</span>
                  </span>
                    </li>
                  </div>
              );
            }
            else {
              return (
                  <div className='item'>
                    <li style={{paddingLeft: this.props.padding}}>
                      <img className="expand" id='expand' height='20' width='20'
                           onClick={this.expand.bind(this, node.id)}
                           src='app/Media/Expand.png'/>
                      <span onClick={this.holdNode.bind(this, node)} className='itemSpan'>
                    <img height='15' width='20' src='app/Media/image1.png'/>
                    <span className='lableSpan'>{node.lable}</span>
                  </span>
                    </li>
                  </div>
              );
            }

          }
        }));
  }

  render () {
    return (
        <div className='treeView'>
          {this.getTreeView()}
        </div>
    );
  }
}

module.exports = TreeView;

