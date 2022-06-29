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
  fileImport.fileTypes = [];
  fileImport.currentFile = 0;
  if (files.length) {
      var fileMap = new Map();

      for (var i = 0; i < files.length; i++) {
          var file = files[i];
          console.log(file)
          var fileReader = new FileReader();
          fileMap.set(fileReader, file);
          var fileType = file.name.split(".");
          fileType = fileType[fileType.length - 1].toUpperCase();
          fileImport.fileTypes.push(fileType);
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
    fileImport.data = fileImport.parseFiles();
    console.log(fileImport.data)
    return fileImport.data;
  }

  var [fileReader, file] = nextValue.value;

  if(fileImport.fileTypes[fileImport.currentFile].includes("XLS")){
    fileReader.readAsBinaryString(file);
  }
  else{
    fileReader.readAsText(file);
  }

  fileImport.currentFile++;
  
  fileReader.onload = () => {
      fileImport.data.push(fileReader.result);
      // Read the next file
      fileImport.readFile(mapEntries);
      
  };
  
}

fileImport.parseFiles = function(){
  logger.log("fileImport.parseFiles",[])
  var data = [];
  for(var i=0;i<fileImport.data.length;i++){
    if(fileImport.fileTypes[i].includes("XLS")){
      data.push(fileImport.parseXlsx(fileImport.data[i]));
    }
    else{
      data.push(fileImport.parseCsvToArrayOfObjects(fileImport.data[i]));
    }
  }
  return data;
}


fileImport.parseCsvToArrayOfObjects = function(text, headerLine){
  logger.log("fileImport.parseCsvToArrayOfObjects",[text, headerLine])
  if(!headerLine){
    headerLine = 0;
  }

  var lines = text.split("\n");
  console.log("lines",lines)
  var headers = lines[headerLine].split(",");
  console.log("headers",headers)
  var data = [];
  for(var i=headerLine+1;i<lines.length;i++){
    var lineDat = lines[i].split(",");
    var line = {};
    for(var ii=0;ii<lineDat.length;ii++){    
      line[headers[ii]] = lineDat[ii];
    }
    data.push(line)
  }

  return data;
}

fileImport.parseXlsx = function(file){
  logger.log("fileImport.parseXlsx",[file])
  var workbook = XLSX.read(file);
  return workbook;
}