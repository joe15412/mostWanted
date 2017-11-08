/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
		searchByName(people);
		break;
    case 'no':
		searchByTraits(people);
		break;
    default:
		alert("Wrong! Please try again, following the instructions dummy. :)");
		app(people); // restart app
		break;
  }
}

function searchByTraits(people) {
  let filteredPeople = people;
  let continueSearch = true;

  while (continueSearch===true){
	let userSearchChoice =  prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
	switch(userSearchChoice) {
		case "height":
			filteredPeople = searchByHeight(filteredPeople);
			trait
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

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
		displayPerson(person);
		break;
	case "family":
		family = displayFamily(person,people);
		alert(family);
		break;
    case "descendants":
		descendants = getDescendants(people,person);
		alert(descendants);
		break;
	case "restart":
		app(people); // restart
		break;
    case "quit":
		return; // stop execution
    default:
		return mainMenu(person, people); // ask again
  }
}

function searchAgain(length){
	let continueSearch = ("Would you like to continue your search.Type 'yes' to search again or 'no' to continue" , yesNo).toLowerCase();
	
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
		
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}

function searchByHeight(people){
		
}

function searchByEyeColor(people){
		
}

function searchByOccupation(people){
		
}

function searchByGender(people){
	
}

function searchByAge(people){
	
	let ageGoal = prompt("What is the person's age");
	
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

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  // TODO: find the person using the name they entered

}

//parents, spouse, siblings and children
function displayFamily(person, people){
  let personID = person.id;
  let familyString = "";

  for(let i=0;i < people.length; i++){
  	if(people[i].currentSpouse === personID){
  		familyString += "Spouse: " + people.firstName + "" + people.lastName + "\n";
  	}
  	if(people[i].parents[i] === personID){
  		familyString += "Parent(s): " + people.firstName + "" + people.lastName + "\n";
  	}

  }
  return familyString;
}


// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
	
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

// user needs list of their full names, descendants are limited 'by blood' (use recursion)

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";  
  personInfo += "Height: " + convertToFeetInches(person.height) + "\n";
  personInfo += "Weight: " + person.weight + "lbs.\n";
  personInfo += "Eye color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";

  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
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