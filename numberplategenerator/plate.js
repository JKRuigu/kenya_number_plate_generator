var plate = 'KAA999A'
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var nextPlate =plate[0]

// function to get letter
function getNextLetter(letter){
	return alphabet.indexOf(letter) === 25?'A':(alphabet[alphabet.indexOf(letter)+1])
}
// get next number/stage one;
function getNextNumber(num){
	let x = Number(num)+1
	 return (x <10) ? `00${x}`:(x<100)?`0${x}`: (x=== 1000)? '001':x
}
// stages
// stage 1; increment numbers - min 001 max 999 - calls stage 2
// stage 2; increament last letter - min A max Z - if not max calls stage 1 ,max calls stage 3,runs once,resets stage 1 to min
// stage 3; increament 3 letter (index =2)  - min A max Z - if not max calls stage 1 and reset stage 2 to min
// stage 4; increament 2 letter (index =1)  - min A max Z - if not max calls stage 

// console.log(getLetters("A"))
function stageOne(plate) {
	return (plate.slice(0,3)+getNextNumber(plate.slice(3,6))+plate.slice(6,7))
}
//stage 2;
function stageTwo(plate) {
	return (plate.slice(0,6)+getNextLetter(plate[6]))
}

//stage 3;
function stageThree(plate) {
	return (plate.slice(0,2)+getNextLetter(plate[2]))+plate.slice(3,7)
}

//stage 3;
function stageFour(plate) {
	return (plate.slice(0,1)+getNextLetter(plate[1]))+plate.slice(2,7)
}

function getCode(plate) {
	if (Number(plate.slice(3,6)) !== 999) {
		return 0; //calls stage one
	}
	if (Number(plate.slice(3,6)) === 999 && plate.slice(6,7) !== 'Z') {
		return 1; //calls stage one & stage two
	}
	if (Number(plate.slice(3,6)) === 999 && plate.slice(6,7) === 'Z' && plate.slice(2,3) !== 'Z') {
		return 2; //calls stage one,stage two & stage three
	}
	if (Number(plate.slice(3,6)) === 999 && plate.slice(6,7) === 'Z' && plate.slice(2,3)=== 'Z') {
		return 3; //calls stage one,stage two,stage three & stage four
	}

}

function getNextPlate(plate) {
	if (Number(plate.slice(3,6)) !== 999) {
		return stageOne(plate)
	}

}

function getAllPlate() {
	let index = 1;

	while(plate !=='KZZ999Z'){
		let code = getCode(plate)

		if (code === 0) {
			plate = stageOne(plate)
		}
		if (code === 1) {
			plate = stageOne(plate)
			plate = stageTwo(plate)
		}
		if (code === 2) {
			plate = stageOne(plate)
			plate = stageTwo(plate)	
			plate = stageThree(plate)	
		}

		if (code ===3 ) {
			plate = stageOne(plate)
			plate = stageTwo(plate)	
			plate = stageThree(plate)	
			plate = stageFour(plate)	
		}
		if (index%25974===0) {
			console.log(plate,index)
		}
		index++
	}
}

console.log(getNextPlate(plate))
