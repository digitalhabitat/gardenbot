// This script will make vscode app links with "vscode" class name
window.addEventListener('load',(event)=>{
    const digs = document.getElementsByClassName("fossor");
    //alert(digs);
    for(const element of digs)
    {
      //alert(element.href);
      var str = element.href;
      str = str.replace(/^file:/,'view-source:file:');
      element.href = str;
    }

    var FileSystemDirectoryEntry = window.FileSystemDirectoryEntry || window.DirectoryEntry;
    var FileSystemEntry = window.FileSystemEntry || window.Entry;

    let fileHandles;
    const options = {
     multiple: true,
    };
     
    document.querySelector(".pick-file").onclick = async () => {
      fileHandles = await window.showDirectoryPicker(options);
      
      const allContent = await Promise.all(
        fileHandles.map(async (fileHandle) => {
          const file = await fileHandle.getFile();
          const content = await file.text();
          return content;
        })
      );
      
      console.log(allContent);
     };
 

/////////
// VSCODE
//////////
    // get list of html collection of "vscode" class objects
    const list = document.getElementsByClassName("vscode");
    // loop thru elements of list
    for (const element of list){
      // get link string
      var str = element.href;
      // replace "file:///" uri with "vscode://file/"
      str = str.replace(/^file:\/\/\//,'vscode://file/');
      // update link string
      element.href = str;
    }
  });