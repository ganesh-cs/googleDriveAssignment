var React = require('react');

class ListView extends React.Component {
  constructor (props) {
    super(props)
    this.getViewList = this.getViewList.bind(this);
    this.getHeading = this.getHeading.bind(this);
  }

  getViewList () {
    if (this.props.selectedNode.childrens) {
      return (
          this.props.selectedNode.childrens.map((node) => {
            return (
                <div className='listViewItem'>
                  <div className='imageOfList'>
                    <img  className='imageOfList' src='app/Media/image2.png'/>
                  </div>
                  <div className='nameOfList'>
                    <span > {node.lable}</span>
                  </div>
                  <div className='ownerOfList'>
                    <span > {node.sOwner}</span>
                  </div>
                  <div className='lastModifiedOfList'>
                    <span > {node.sLastModified}</span>
                  </div>
                </div>

            );
          })
      );
    }
  }

  getHeading () {
    return (
        <div className='headerOfListView'>
          <span className='listViewHeader_Name'> Name</span>
          <img  className='listViewHeader_ArrowIcon' src='app/Media/downArrow.png'/>
          <span className='listViewHeader_Owner'> Owner</span>
          <span className='listViewHeader_LastModified'> Last modified</span>
          <span className='listViewHeader_FileSize'> File size</span>
        </div>
    );
  }


  render () {
    return (
        <div className='listView'>

          {
            this.getHeading()
          }
          {
            this.getViewList()
          }
        </div>
    );
  }

}

module.exports = ListView;


