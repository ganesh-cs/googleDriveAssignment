var React=require('react');

class GridView extends React.Component{
  constructor(props){
    super(props)
    this.getFolders=this.getFolders.bind(this);
    this.getFiles=this.getFiles.bind(this);

  }

  getFolders () {
    return (this.props.selectedNode.childrens.map((node) => {
          if (node.sType == 'Folder') {
            return (
                <div className='folderRepresentation'>
                  <div className='imageOfGridFolder'>
                    <img className='imageOfGridFolder' src='app/Media/image2.png'/>
                  </div >
                  <div className='nameOfGridViewFolder'>
                    <span > {node.lable}</span>
                  </div>
                </div>
            );
          }
        })
    );
  }
  getFiles(){
    return (this.props.selectedNode.childrens.map((node) => {
          if (node.sType == 'File') {
            return (
                <div className='fileRepresentation'>
                  <div className='imageOfGridFile'>
                    <img className='imageOfGridFile' src='app/Media/fileIcon.png'/>
                  </div >
                  <div className='iconOfGridFile'>
                    <img className='iconOfGridFile' src='app/Media/fileIcon2.png'/>
                  </div>
                  <div className='nameOfGridViewFile'>
                    <span style={{marginLeft:'14px'}}> {node.lable}</span>
                  </div>
                </div>
            );
          }
        })
    );
  }
  render(){
    if (this.props.selectedNode.childrens) {
      return (

          <div className='gridViewContainer'>
            <div className='foldersContainerOfGridView'>
              <div className='folderHeaderOfGridView'>
                <span>Folders</span>
                <span style={{marginLeft: '94%'}}>Name</span>
              </div>
              <div style={{ flexWrap: 'wrap', display: 'flex'}}>
              {this.getFolders()}
              </div>
            </div>
            <div className='filesContainerOfGridView'>
              <div className='fileHeaderOfGridView'>
                <span>Files</span>
              </div>
              <div style={{flexWrap: 'wrap', display: 'flex'}}>
                {this.getFiles()}
              </div>
            </div>
          </div>
      );
    }
    else{
      return(null);
    }

  }
}



module.exports=GridView;