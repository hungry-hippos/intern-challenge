const redirect = window.redirect

const SECRET_COMBO = [1, 3, 5, 1]

const lockState = window.mobx.observable({
  locked: true,
  wheels: [0, 0, 0, 0]
})

function changeDialValue (index, incrementBy) {

  //finding new update value, including upper/lower edge cases
  var currVal=lockState.wheels[index];
  var newVal=0;
  if (currVal===9 && incrementBy===1){
    newVal=0;
  }else if (currVal===0 && incrementBy===-1){
    newVal=9;
  }else{
    newVal=currVal+incrementBy;
  }

  //updating new val
  lockState.wheels[index]=newVal;
  
  //checking if combo matches secret combo
  var isLockUnlocked=true;
  for (var i=0;i<lockState.wheels.length;i++){
    //only one mismatch needed to fail
    if (lockState.wheels[i]!==SECRET_COMBO[i]){
      isLockUnlocked=false;
      break;
    }
  }
  //updating value
  lockState.locked=!isLockUnlocked;

  //redirecting if lock is opened
  if (isLockUnlocked){
    redirect('alejandro-duran');
  }
}

// let our other modules find our functions
window.lockState = lockState
window.changeDialValue = changeDialValue
