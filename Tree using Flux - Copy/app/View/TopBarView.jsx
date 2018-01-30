var React = require('react');
var Action = require('../Action/TreeAction.js');

class TopBarView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {textBoxStatus: 'hide', text: ''};
    this.removeItem = this.removeItem.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.getViewIcon = this.getViewIcon.bind(this);
  }

  changeNewItemStatus () {
    Action.changeAddItemStatus();
  }

  removeItem () {
    if (this.props.selectedNode != null) {
      Action.removeItem();
    }
  }

  onTextChange (event) {
    this.state = {text: event.target.value};
  }

  setView (view) {
    Action.setView(view);
  }

  getViewIcon(){
    if(this.props.view=='GridView'){
      return(<img className="listViewImage" onClick={this.setView.bind(this,'ListView')} src='app/Media/listViewIcon.png'/>);
    }
    else{
      return(<img className="gridViewImage" onClick={this.setView.bind(this,'GridView')} src='app/Media/gridViewIcon.png'/>);
    }
  }

  render () {
    return (
        <div className='topBar'>
          {/* <img className="add" id='add' onClick={this.changeTextBoxStatus} src='app/Media/add.png'/>
            <img className="edit" id='edit' onClick={this.editText} src='app/Media/edit.png'/>
            <img className="remove" id='remove' onClick={this.removeItem} src='app/Media/remove.png'/>*/}
          <div>
            <img className="contentsphereIcon"  src='app/Media/contentsphereIcon.png'/>
            <span className='drive'>Drive</span>
          </div>
          <button className='newButton' onClick={this.changeNewItemStatus}>NEW</button>
          <div className='viewIcon'>
            {
              this.getViewIcon()
            }
          </div>
        </div>
    );
  }
}

module.exports = TopBarView;