var React=require('react');
var Action=require('../Action/TreeAction.js');

class AddItemView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {sName: '', sOwner: '', sType: ''}
    this.onCancelClick = this.onCancelClick.bind(this);
    this.setName = this.setName.bind(this);
    this.setOwner = this.setOwner.bind(this);
    this.setType = this.setType.bind(this);
    this.saveItem = this.saveItem.bind(this);
  }

  onCancelClick () {
    Action.changeAddItemStatus();
  }

  setName (event) {
    this.setState({sName: event.target.value});
  }

  setOwner (event) {
    this.setState({sOwner: event.target.value});
  }

  setType (event) {
    this.setState({sType: event.target.value});
  }

  saveItem () {
    Action.addItem(this.state.sName,this.state.sOwner,this.state.sType);
  }

  render () {
    return (
        <div>
          <div className='addItemViewContainer'>
          </div>
          <div className='addItem'>
            <div style={{margin: '16px'}}>
              <div>
                <span style={{marginLeft: '19px'}}>Name:</span>
                <input type='text' style={{marginLeft: '50px'}} onChange={this.setName}/>
              </div>
              <br/>
              <div>
                <span style={{marginLeft: '19px'}}>Owner:</span>
                <input type='text' style={{marginLeft: '47px'}} onChange={this.setOwner}/>
              </div>
              <br/>
              <div>
                <span style={{marginLeft: '18px'}}>Type:</span>
                <br/>
                <label style={{marginLeft: '104px'}}>
                  <input type="radio" value="Folder" name='type' onChange={this.setType}/>
                  Folder
                </label>
                <label style={{marginLeft: '62px'}}>
                  <input type="radio" value="File" name='type' onChange={this.setType}/>
                  File
                </label>
              </div>
              <br/>
              <div style={{marginLeft: '104px', float: 'left', fontSize: '12px'}}>
                <button className='cancelButton' onClick={this.onCancelClick}>
                  CANCEL
                </button>
              </div>
              <div style={{marginLeft: '104px'}}>
                <button style={{backgroundColor: '#4285f4'}} className='createButton' onClick={this.saveItem}>
                  CREATE
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

module.exports=AddItemView;