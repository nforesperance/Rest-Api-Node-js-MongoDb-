module.export= function search(query){


    return function(element) {
        for(var i in query) {
          if(query[i] != element[i]) {
            return false;
          }
        }
        return true;
      }



}

module.exports=function(datas,query){

  return datas.filter(search(query));
}