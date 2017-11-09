function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
		let foundPerson = searchByName(people);
		mainMenu(foundPerson[0],people);
		break;
    case 'no':
		searchByTraits(people);
		break;
    default:
		alert("Wrong! Please try again, following the instructions dummy. :)");
		app(people);
		break;
  }
}

function searchByTraits(people) {
  let filteredPeople = people;
  let continueSearch = true;

  while (continueSearch===true){
	let userSearchChoice =  promptFor("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.",chars).toLowerCase();
	switch(userSearchChoice) {
		case "height":
			filteredPeople = searchByHeight(filteredPeople);
			break;
		case "weight":
			filteredPeople = searchByWeight(filteredPeople);
			break;
		case "eye color":
			filteredPeople = searchByEyeColor(filteredPeople);	
			break;
		case "occupation":
			filteredPeople = searchByOccupation(filteredPeople);	
			break;
		case "age":
			filteredPeople = searchByAge(filteredPeople);
			break;
		case "gender":
			filteredPeople = searchByGender(filteredPeople);
			break;
		default:
			alert("You entered an invalid search type! Please try again.");
			searchByTraits(filteredPeople);
			break;
	}
		if(filteredPeople.length>1){
			displayPeople(filteredPeople);
			continueSearch = searchAgain(filteredPeople.length);
		}
		else{
			continueSearch = false;
		}
  }
	let foundPerson = filteredPeople[0];
	mainMenu(foundPerson, people);
}

function mainMenu(person, people){

  if(!person){
    alert("Could not find that individual.");
    return app(people);
  }

  var displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'",chars).toLowerCase();

  switch(displayOption){
    case "info":
		displayPerson(person);
		break;
	case "family":
		alert(displayFamily(person,people));
		break;
    case "descendants":
		descendants = getDescendants(people,person);
		alert(descendants);
		break;
	case "restart":
		app(people);
		break;
    case "quit":
		return;
    default:
		return mainMenu(person, people);
  }
}

function searchAgain(length){
	let continueSearch = promptFor("Would you like to continue your search.Type 'yes' to search again or 'no' to continue" , yesNo).toLowerCase();
	
	if(continueSearch === 'yes'){
		return true;
	}
	else if(continueSearch === 'no'){
		return false;
	}
	else{
		searchAgain(length);
	}
}

function searchByName(people){
  let userInputFirstName = promptFor("What is the person's first name?",chars).toLowerCase();
  let userInputLastName = promptFor("What is the person's last name?",chars).toLowerCase();
  
  let newArray = people.filter(function (el) {
    if(el.firstName.toLowerCase() === userInputFirstName && el.lastName.toLowerCase() === userInputLastName) {
      return true;
    }
  });

  return newArray;	
	

}

function searchByWeight(people) {
  let userInputWeight = promptFor("How much does the person weigh?",isInteger);

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
  });

  return newArray;
}

function searchByHeight(people){
  let userInputHeight = promptFor("How tall is the person (in inches)?",isInteger);

  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }

  });

  return newArray;
}		


function searchByEyeColor(people){
  let userInputEyeColor = promptFor("What color are the persons eyes?",chars).toLowerCase();

  let newArray = people.filter(function (el) {
    if(el.eyeColor.toLowerCase() === userInputEyeColor) {
      return true;
    }

  });

  return newArray;	
}

function searchByOccupation(people){
  let userInputOccupation = promptFor("What is the persons occupation?",chars).toLowerCase();

  let newArray = people.filter(function (el) {
    if(el.occupation.toLowerCase() === userInputOccupation) {
      return true;
    }

  });

  return newArray;
		
}

function searchByGender(people){
  let userInputGender = promptFor("What is the persons gender? (please enter 'male' or 'female)",maleFemale);

  let newArray = people.filter(function (el) {
    if(el.gender === userInputGender) {
      return true;
    }

  });

  return newArray;	
		
}	


function searchByAge(people){
	
	let ageGoal = promptFor("What is the person's age",isInteger);
	
		let peopleWithinCriteria = people.filter( function (el){
			if(parseInt(ageGoal)===getAge(el.dob)){
				return true;
			}
		});
		return peopleWithinCriteria;
}

function getDescendants(people,person){

	if(person === undefined){
		return "";
	}
	
	let personId= person.id;
	let descendantString = "";
	
	let descendants = people.filter( function (el){
		for(let i=0;i<el.parents.length;i++){
			if(el.parents[i] === personId){
				descendantString += el.firstName+ " "+ el.lastName + "\n";
				return true;
			}
		}
	});

	for(let i=0;i<descendants.length;i++){
		descendantString += getDescendants(people,descendants[i]);
	}
	
	return descendantString;
}

function getAge(dateOfBirth){
  
  let dob = new Date(dateOfBirth);
  let currentDate = new Date();
  
  if(dob.getMonth()<currentDate.getMonth()){
		return currentDate.getFullYear() - dob.getFullYear();
  }
  else if(dob.getMonth()===currentDate.getMonth()){
	  if(dob.getDay()<=currentDate.getDay()){
		return currentDate.getFullYear() - dob.getFullYear();
	  }	  
  }
  
  return currentDate.getFullYear()- dob.getFullYear() -1;
}

function displayFamily(person,people){
	
	let family = [];
	let familyString ="";
	
	let children = getChildren(person,people);
	familyString += displayChildren(children);

	let spouse = getSpouse(person,people);
	familyString += displaySpouse(spouse);
	
	let parents = getParents(person,people);
	familyString += displayParents(parents);
	
	let siblings = getSiblings(parents,people,person);
	familyString += displaySiblings(siblings);

	return familyString;
}

function getChildren(person,people){
	let personId = person.id;

	let descendants = people.filter( function (el){
		for(let i=0;i<el.parents.length;i++){
			if(el.parents[i] === personId){
				return true;
			}
		}
	});
	
	return descendants;
}

function displayChildren(children){
	let childrenString="";
	
	if(children.length > 0){
		childrenString += "Children: \n";
	
		for(let i=0;i<children.length;i++){
			childrenString+= children[i].firstName + " " + children[i].lastName + "\n";		
		}
	}
	else{
		childrenString += "Children \nNone\n";
	}
	
		return childrenString;
}

function getSpouse(person,people){

	if(person.spouse !==null){
		let personId = person.id;

		let descendants = people.filter( function (el){
			if(el.currentSpouse === personId){
				return true;
			}
		});
		return descendants;
	}
}

function displaySpouse(spouse){
	
	if(spouse.length > 0){
		return "Spouse: \n"+spouse[0].firstName+" "+spouse[0].lastName+ "\n";
	}
	else{
		return "Spouse: \nNone\n";
	}
}
function getParents(person,people){
	let personId;
	let parents = [];
	
	for(let i=0;i<person.parents.length;i++){
		personId = person.parents[i];
		for(let j=0;j<people.length;j++){
			if(people[j].id === personId){
				parents.push(people[j]);
				break;
			}
		}	
	}
	return parents;
}

function displayParents(parents){
	
	if(parents.length >0){
		let parentsString = "Parents: \n";
	
		for(let i=0;i<parents.length;i++){
			parentsString+= parents[i].firstName + " " + parents[i].lastName + "\n";		
		}

		return parentsString;
	}
	else{
		return "Parents: \nNone\n";
	}
}

function getSiblings(parents,people,person){
	let siblings = [];
	for(let i=0;i<parents.length;i++){
		let parentID=parents[i].id;
		siblings = people.filter(function (el){
			for(j=0;j<el.parents.length;j++){
				if(parentID===el.parents[j]){
					return true;
				}
			}
		});		
	}
	
	for(let i=0;i<siblings.length;i++){
		if(siblings[i].id===person.id){
			siblings.splice (i,1);
		}
	}
	
	return siblings;
}

function displaySiblings(siblings){
	
	if(siblings.length>0){
		let siblingsString = "Siblings: \n";
	
		for(let i=0;i<siblings.length;i++){
			siblingsString+= siblings[i].firstName + " " + siblings[i].lastName + "\n";		
		}

		return siblingsString;
	}
	else{
		return "Siblings:\n None";
	}
}

function displayPeople(people){
  alert(people.map(function(person){
	
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){

  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";  
  personInfo += "Height: " + convertToFeetInches(person.height) + "\n";
  personInfo += "Weight: " + person.weight + "lbs.\n";
  personInfo += "Eye color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";

  alert(personInfo);
}

function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input){
  return true;
}

function isInteger(input){
	
	if(!isNaN(input)){return true;}
	else{return false;}
}

function maleFemale(gender){
	return gender.toLowerCase() == "male" || gender.toLowerCase() == "female";
}
 function convertToFeetInches(heightInInches){
	
	let heightString = '';
	
	if(parseInt(heightInInches)%12===0){
		let heightInFeet=parseInt(heightInInches)/12;
		heightString += heightInFeet + "'";
	}
	else{
		let remainder= heightInInches%12;
		heightInInches -= remainder;
		let heightInFeet=parseInt(heightInInches)/12;
		heightString += heightInFeet + "'" + remainder + '"';		
	}
	
	return heightString;
}