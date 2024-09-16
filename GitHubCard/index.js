/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
// axios.get("https://api.github.com/users/Nsandomeno");


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
const entryPoint = document.querySelector(".cards");

axios.get("https://api.github.com/users/Nsandomeno")
  .then(function(response){
    console.log(response)
    entryPoint.appendChild(cardMaker(response.data));
  })
  .catch(function(error){
    console.log(error);
  })

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/
const followersArray = [];
axios.get("https://api.github.com/users/Nsandomeno/followers")
  .then(function(response){
    for (person of response.data){
      followersArray.push(person.login);
      //return followersArray;
    }
  })
  .then(function(response){
    followersArray.forEach(function(item){
      axios.get("http://api.github.com/users/" + item)
        .then(function(response){
          const followerCard = response.data
          entryPoint.appendChild(cardMaker(followerCard))
        })
    })
  })


// followersArray.forEach(function(person){
//   entryPoint.appendChild(cardMaker(person));
// })
  //return followersArray;





// axios.get("https://api.github.com/users/Nsandomeno/followers")
//   .then(function (response) {
//     for (item of response.data) {
//       //console.log(item.login);
//       axios.get("http://api.github.com/users/" + item.login)
//         .then(function (response) {
//           const person = response.data
//           cards.appendChild(cardMaker(person));
//         })
//         }
//         }) 



//  followersArray.forEach(function(person){
//    entryPoint.appendChild(cardMaker(person));
// })
//   return followersArray;


// followersArray.forEach(function(person){
//   entryPoint.appendChild(cardMaker(person))
// })



/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function cardMaker(data){
  const card = document.createElement('div');
  const proPic = document.createElement('img'); // appended to card
  const subContainer = document.createElement('div'); // appended to card

  const personName = document.createElement('h3'); // appened to subContainer
  const userName = document.createElement('p'); // appended to subContainer
  const userLocation = document.createElement('p'); // appended to subContainer

  const userProfile = document.createElement('p'); // appended to subContainer
  const userLink = document.createElement('a'); // appended to userProfile
  const followCount = document.createElement('p'); // appended to subContainer
  const followingCount = document.createElement('p'); // appended to subContainer
  const blurb = document.createElement('p'); // appended to subContainer

  card.classList.add('card');
  subContainer.classList.add('card-info');
  personName.classList.add('name');
  userName.classList.add('username');
  
  proPic.src = data.avatar_url;
  personName.textContent = data.name;
  userName.textContent = data.login;
  userLink.href = data.html_url;
  userLink.textContent = data.html_url;
  followCount.textContent = `Followers: ${data.followers}`;
  followingCount.textContent = `Following: ${data.following}`;
  blurb.textContent = `Bio: ${data.bio}`;



  card.appendChild(proPic);
  card.appendChild(subContainer);
  
  subContainer.appendChild(personName);
  subContainer.appendChild(userName);
  subContainer.appendChild(userLocation);
  subContainer.appendChild(userProfile);
  
  userProfile.appendChild(userLink);

  subContainer.appendChild(followCount);
  subContainer.appendChild(followingCount);
  subContainer.appendChild(blurb);




  return card;
};

