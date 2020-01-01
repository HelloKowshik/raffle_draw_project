
window.onload = function(){
  //let inp = document.getElementById('inp');
  let inp = $('#inp');
  let nameList = $('#name-list');
  let display = $('#display');
  let giveATry = $('#give-a-try');
  let firstPos = $('#first-position');
  let secondPos = $('#second-position');
  let thirdPos = $('#third-position');
  
  // Extract text from  textarea ,store it in array
  
  const participantNames = [];
  inp.addEventListener('keypress',function(event){
      if(event.key === 'Enter'){
          let newNames = event.target.value.split(', ');
          if(newNames[0]!==''){
              newNames.forEach(name=>{
                  participantNames.push(name);
                  let item = createListItem(name);
                  nameList.appendChild(item);
                  event.target.value = '';
              });
          }
      }
  });

  giveATry.addEventListener('click',function(e){
      if(participantNames.length === 0){
          alert('No Participants in the Contest!');
      }else{
          let shuffledNames = shuffle(participantNames);
          for(let i = 1; i<shuffledNames.length ; i++){
              (function(i,count){
                  setTimeout(()=>{
                      let rand = Math.floor(Math.random()*(shuffledNames.length-1));
                      display.innerHTML = shuffledNames[rand];
                      if(count === shuffledNames.length-1){
                          if(!firstPos.innerHTML){
                              firstPos.innerHTML = shuffledNames[rand];
                              let indx = participantNames.indexOf(shuffledNames[rand]);
                              participantNames.splice(indx,1);
                          }
                      else if(!secondPos.innerHTML){
                          secondPos.innerHTML = shuffledNames[rand];
                          let indx = participantNames.indexOf(shuffledNames[rand]);
                          participantNames.splice(indx,1);

                      }else if(!thirdPos.innerHTML){
                          thirdPos.innerHTML = shuffledNames[rand];
                          let indx = participantNames.indexOf(shuffledNames[rand]);
                          participantNames.splice(indx,1);

                      }else{
                          alert('Draw Finished!');
                      }
                  }

                  },i);
              })(i*100,i);
          }
      }
  });

  function $(e){
      let type =document.querySelector(e);
      return type;
  }
}

// Render names extracted from tetarea

function createListItem(name){
  let li = document.createElement('li');
  li.className = 'list-group-item';
  li.innerHTML = name;
  return li;
}

function shuffle(arr){
  let shuffledArr = [...arr];
  for(let i = shuffledArr.length-1 ; i>0 ; i--){
      let rand = Math.floor(Math.random() * (i+1));
      let temp = shuffledArr[rand];
      shuffledArr[rand] = shuffledArr[i];
      shuffledArr[i] = temp;
  }
  return shuffledArr;
}
