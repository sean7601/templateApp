var fileImport = {};

fileImport.data = [];
fileImport.createFolderInput = function(id){
  logger.log("fileImport.createFolderInput",[id])
  var html = "<input class='form-control' type='file' id='"+id+"' webkitdirectory mozdirectory></input>"
  return html
}

fileImport.createFileInput = function(id){
  logger.log("fileImport.createFileInput",[id])
  var html = "<input class='form-control' type='file' id='"+id+"' multiple></input>"
  return html
}

fileImport.readFiles = function(id) {
  logger.log("fileImport.readFiles",[id])
  fileImport.data = [];
  var files = document.getElementById(id).files
  console.log(files)
  fileImport.data = [];
  if (files.length) {
      var fileMap = new Map();

      for (var i = 0; i < files.length; i++) {
          var file = files[i];
          var fileReader = new FileReader();
          fileMap.set(fileReader, file);
      }

      var mapEntries = fileMap.entries();
      fileImport.readFile(mapEntries);

  }
}


//this function can be customized for different use cases after the line if (nextValue.done === true)
fileImport.readFile = function(mapEntries){
  logger.log("fileImport.readFile",[mapEntries])

  var nextValue = mapEntries.next();

  if (nextValue.done === true) {
    //This is where you put code you want to execute after reading all files
      return fileImport.data;
  }

  var [fileReader, file] = nextValue.value;

  fileReader.readAsText(file);
  fileReader.onload = () => {
      fileImport.data.push(fileReader.result);
      // Read the next file
      fileImport.readFile(mapEntries);
      
  };
  
}


fileImport.parseCsvToArrayOfObjects = function(text, headerLine){
  if(!headerLine){
    heaaderLine = 0;
  }
  var lines = text.split("\r\n");
  var headers = lines[headerLine];
  var data = [];
  for(var i=headerLine+1;i<lines.length;i++){
    for(var ii=0;ii<headers.length;ii++){
      var line = {};
      line[headers[ii]] = lines[i][ii];
    }
    data.push(line)
  }

  return data;
}