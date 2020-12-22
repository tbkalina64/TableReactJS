// import React from 'react';

// const Table = () => {

//     class ApiClient {

//         _apiData = 'https://jsonplaceholder.typicode.com';

//         async getResource(url) {
//             const response = await fetch(`${this._apiData}${url}`);

//             if (!response.ok) {
//                 throw new Error(`Could not fetch  ${url}` + `, received ${response.status}`);
//             }
//             return await response.json();
//         }
//         getAllUsers() {
//             return this.getResource(`/users/`);
//         }
//         getUser(id) {
//             return this.getResource(`/users/${id}`);
//         }
//     }

//     const apiUsers = new ApiClient();

//     apiUsers
//         .getAllUsers()
//         .then((users) => {
//             users.forEach((user) => {
//                 // console.log(user.name);
//                 <p>
//                 ${user.name}
//             </p>
//             });
//         })
//         .catch((err) => {
//             console.error('Could not fetch', err);
//         });

//         const createHeader = () => {
//             let headerElement = ['id', 'name', 'email', 'phone', 'deleteBtn'];
    
//             return headerElement.map((key, index) => {
//                 return <th key={index}>{key.toUpperCase()}</th>
//             })
//         }

//         // const removeData = (id) => {

//         //     axios.delete(`${URL}/${id}`).then(res => {
//         //         const del = employees.filter(employee => id !== employee.id)
//         //         setEmployees(del)
//         //     })
//         // } 

//         // const createBody = () => {
//         //     return users.map(({ id, name, email, phone }) => {
//         //         return (
//         //             <tr key={id}>
//         //                 <td>{id}</td>
//         //                 <td>{name}</td>
//         //                 <td>{email}</td>
//         //                 <td>{phone}</td>
//         //                 <td className='deleteBtn'>
//         //                     {/* <button className='button' onClick={() => removeData(id)}>Delete</button> */}
//         //                 </td>
//         //             </tr>
//         //         )
//         //     })
//         // }


//     return (
//         <div>
//             <h1>React Table</h1>
//             <table id='users'>
//                 <thead>
//                     <tr>{ createHeader() }</tr>
//                 </thead>
//                 <tbody>
//                     { createBody() }
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Table;