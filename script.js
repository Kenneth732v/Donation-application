
// DOM Render Functions

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const userObj = {
        name: e.target.name.value,
        imageUrl: e.target.imageUrl.value,
        description: e.target.description.value,
        donations: 0,
      };
      const newUser = await adoptUser(userObj);
      renderOneUser(newUser);
    } catch (error) {
      console.error(error);
      alert(`An error occurred: ${error}`);
    }
  });
  
  async function renderOneUser(user) {
    try {
      const card = document.createElement('li');
      card.className = 'card';
      card.innerHTML = `
        <div class="content-box">
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <img class="w-full" src="${user.imageUrl}">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">${user.name}</div>
          <p class="text-gray-700 text-base">
            $ <span class="donation-count">${user.donations}</span> :Donation
          </p>
        </div>
        <div class="buttons">
          <button class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" id="donate">Donate</button>
          <button class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" id="delete">delete</button>
      </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
        </div>
      </div>
        </div>
      `;
      card.querySelector('#donate').addEventListener('click', async () => {
        try {
          user.donations += 10;
          card.querySelector('span').textContent = user.donations;
          await handleUpdate(user);
        } catch (error) {
          console.error(error);
          alert(`An error occurred: ${error}`);
        }
      });
      
      card.querySelector('#delete').addEventListener('click', async () => {
        try {
          card.remove();
          await handleDelete(user.id);
        } catch (error) {
          console.error(error);
          alert(`An error occurred: ${error}`);
        }
      });
      document.querySelector('#display-user-data').appendChild(card);
    } catch (error) {
      console.error(error);
      alert(`An error occurred: ${error}`);
    }
  }
  
//   Render data to page
  async function renderUserData() {
    try {
      const response = await fetch('http://localhost:3000/userData');
      if (!response.ok) {
        throw new Error('Failed to fetch user data.');
      }
      const userData = await response.json();
      userData.forEach((user) => renderOneUser(user));
    } catch (error) {
      console.error(error);
      alert(`An error occurred: ${error}`);
    }
  }
  
//   Handle Post
  async function adoptUser(userObj) {
    try {
      const response = await fetch('http://localhost:3000/userData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObj),
      });
      if (!response.ok) {
        throw new Error('Failed to adopt user.');
      }
      const user = await response.json();
      return user;
    } catch (error) {
      console.error(error);
      alert(`An error occurred: ${error}`);
    }
  }
  
//   Handle Update
  async function handleUpdate(userObj) {
    try {
      const response = await fetch(`http://localhost:3000/userData/${userObj.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObj),
      });
      if (!response.ok) {
        throw new Error('Failed to update user.');
      }
    } catch (error) {
      console.error(error);
      alert(`An error occurred: ${error}`);
    }
  }
  
//   Handle Delete
async function handleDelete(id) {
    try {
        const response = await fetch(`http://localhost:3000/userData/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete user.');
        }
    } catch (error) {
        console.error(error);
        alert(`An error occurred: ${error}`);
    }
}

function initialize(){
    renderUserData();
}
initialize();























// // DOM Render Functions
// document.querySelector('form').addEventListener('submit', (e) => {
//     e.preventDefault()
//     let userObj = {
//         name: e.target.name.value,
//         imageUrl: e.target.imageUrl.value,
//         description: e.target.description.value,
//         donations: 0
//     }
//     renderOneUser(userObj);
//     adoptUser(userObj);
// });
// function renderOneUser(user){
//     let card = document.createElement('li')
//     card.className = 'card'
//     card.innerHTML = `
//        <div class="content-box">
//        <div class="img">
//           <img src="${user.imageUrl}" /></div>
//           <div class="content">
//              <h4>${user.name}</h4>
//              <p>
//              $ <span class="donation-count">${user.donations}</span> :Donation
//              </p>
//              <p>${user.description}</p>
//           </div>
//           <div class="buttons">
//             <button class="btn"id="donate">$10 Donate</button>
//             <button class="btn" id="delete">delete</button>
//           </div>
//        </div>
       
//     `
//     card.querySelector('#donate').addEventListener('click', () => {
//         user.donations+= 10
//         card.querySelector("span").textContent = user.donations
//         handleUpdate(user) 
//     });
//     card.querySelector("#delete").addEventListener("click", () => {
//         card.remove()
//         handleDelete(id)
//     })
//     document.querySelector('#display-user-data').appendChild(card)
// }

// function renderUserData(){
//     fetch('http://localhost:3000/userData')
//     .then((res) => res.json())
//     .then(userData => userData.forEach(user => renderOneUser(user)))
// }
// // post new user
// function adoptUser(userObj){
//     fetch('http://localhost:3000/userData', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userObj)
//     })
//   .then((res) => res.json())
//   .then(user => console.log(user))
// //   .then(userData => userData.forEach(user => renderOneUser(user)))
// }

// // donate to user
// function handleUpdate(userObj){
//     fetch(`http://localhost:3000/userData'/${userObj.id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userObj)
//     })
//     .then((res) => res.json())
//     .then(user => console.log(user))
// }
// function handleDelete(userObj){
//     fetch(`http://localhost:3000/userData'/${id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type' : 'application'
//         }
//     }).then((res) => res.json())
//     .then(user => console.log(user))
// }

// function initialize(){
//     renderUserData();
// }
// initialize();


// CHAT






















// DOM Render Functions
// document.querySelector('form').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     try {
//         const userObj = {
//             name: e.target.name.value,
//             imageUrl: e.target.imageUrl.value,
//             description: e.target.description.value,
//             donations: 0,
//         };
//         const newUser = await adoptUser(userObj);
//         renderOneUser(newUser);
//     } catch (error) {
//         console.error(error);
//         alert(`An error occurred: ${error}`);
//     }
// });

// async function renderOneUser(user) {
//     try {
//         const card = document.createElement('li');
//         card.className = 'card';
//         card.innerHTML = `
//             <div class="content-box">
//                 <div class="img">
//                     <img src="${user.imageUrl}" />
//                 </div>
//                 <div class="content">
//                     <h4>${user.name}</h4>
//                     <p>
//                         $ <span class="donation-count">${user.donations}</span> :Donation
//                     </p>
//                     <p>${user.description}</p>
//                 </div>
//                 <div class="buttons">
//                     <button class="btn" id="donate">$10 Donate</button>
//                     <button class="btn" id="delete">delete</button>
//                 </div>
//             </div>
//         `;
//         card.querySelector('#donate').addEventListener('click', async () => {
//             try {
//                 user.donations += 10;
//                 card.querySelector('span').textContent = user.donations;
//                 await handleUpdate(user);
//             } catch (error) {
//                 console.error(error);
//                 alert(`An error occurred: ${error}`);
//             }
//         });
//         card.querySelector('#delete').addEventListener('click', async () => {
//             try {
//                 card.remove();
//                 await handleDelete(user.id);
//             } catch (error) {
//                 console.error(error);
//                 alert(`An error occurred: ${error}`);
//             }
//         });
//         document.querySelector('#display-user-data').appendChild(card);
//     } catch (error) {
//         console.error(error);
//         alert(`An error occurred: ${error}`);
//     }
// }

// async function renderUserData() {
//     try {
//         const response = await fetch('http://localhost:3000/userData');
//         if (!response.ok) {
//             throw new Error('Failed to fetch user data.');
//         }
//         const userData = await response.json();
//         userData.forEach((user) => renderOneUser(user));
//     } catch (error) {
//         console.error(error);
//         alert(`An error occurred: ${error}`);
//     }
// }

// async function adoptUser(userObj) {
//     try {
//         const response = await fetch('http://localhost:3000/userData', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(userObj),
//         });
//         if (!response.ok) {
//             throw new Error('Failed to adopt user.');
//         }
//         const user = await response.json();
//         return user;
//     } catch (error) {
//         console.error(error);
//         alert(`An error occurred: ${error}`);
//     }
// }

// async function handleUpdate(userObj) {
//     try {
//         const response = await fetch(`http://localhost:3000/userData/${userObj.id}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(user
















// // DOM Elements
// const form = document.querySelector('form');
// const displayUserData = document.querySelector('#display-user-data');

// // Constants
// const API_URL = 'http://localhost:3000/userData';

// // Event Listeners
// form.addEventListener('submit', handleFormSubmit);
// displayUserData.addEventListener('click', handleUserDataClick);

// // Functions
// async function handleFormSubmit(event) {
//   event.preventDefault();
  
//   const name = event.target.elements.name.value.trim();
//   const imageUrl = event.target.elements.imageUrl.value.trim();
//   const description = event.target.elements.description.value.trim();

//   if (!name || !imageUrl || !description) {
//     alert('Please enter all fields.');
//     return;
//   }

//   const user = {
//     name,
//     imageUrl,
//     description,
//     donations: 0
//   };

//   try {
//     const response = await fetch(API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(user)
//     });
    
//     if (!response.ok) {
//       throw new Error('Failed to create user.');
//     }

//     const newUser = await response.json();
//     renderUser(newUser);
//   } catch (error) {
//     alert(`An error occurred: ${error}`);
//   }
// }

// async function handleUserDataClick(event) {
//   if (event.target.matches('#donate')) {
//     const card = event.target.closest('.card');
//     const userId = card.dataset.userId;
//     const donationCount = card.querySelector('.donation-count');
    
//     try {
//       const response = await fetch(`${API_URL}/${userId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ donations: parseInt(donationCount.textContent) + 10 })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update donation.');
//       }

//       const updatedUser = await response.json();
//       donationCount.textContent = updatedUser.donations;
//     } catch (error) {
//       alert(`An error occurred: ${error}`);
//     }
//   } else if (event.target.matches('.delete')) {
//     const card = event.target.closest('.card');
//     const userId = card.dataset.userId;

//     try {
//       const response = await fetch(`${API_URL}/${userId}`, {
//         method: 'DELETE'
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete user.');
//       }

//       card.remove();
//     } catch (error) {
//       alert(`An error occurred: ${error}`);
//     }
//   }
// }

// async function renderUserData() {
//   try {
//     const response = await fetch(API_URL);

//     if (!response.ok) {
//       throw new Error('Failed to retrieve user data.');
//     }

//     const userData = await response.json();
//     userData.forEach(renderUser);
//   } catch (error) {
//     alert(`An error occurred: ${error}`);
//   }
// }

// function renderUser(user) {
//   const card = document.createElement('li');
//   card.className = 'card';
//   card.dataset.userId = user.id;
//   card.innerHTML = `
//     <div class="content-box">
//       <div class="img">
//         <img src="${user.imageUrl}" />
//       </div>
//       <div class="content">
//         <h4>${user.name}</h4>
//         <p>$ <span class="donation-count">${user.donations}</span> Donation</p>
//         <p>${user.description}</p>
//       </div>
//       <div class="buttons">
//         <button id="donate">Donate $10</button>
//         <button class="delete">Delete</button>
//       </div>
//     </div>
//   `;
// }
