// import React, { useState } from 'react';
// import './AddServiceModal.css'; 

// const AddService = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [message, setMessage] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newService = {
//       name,
//       description,
//     };

//     console.log('Service added:', newService);

//     setName('');
//     setDescription('');
//     setMessage('Service added successfully!');
//     setIsModalOpen(false);
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setMessage(''); 
//   };

//   return (
//     <div>
//       <button onClick={openModal}>Add Service</button>

//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={closeModal}>
//               &times;
//             </span>
//             <h2>Add a New Service</h2>
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="name">Service Name:</label>
//                 <input
//                   type="text"
//                   id="name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="description">Description:</label>
//                 <textarea
//                   id="description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />
//               </div>
//               <button type="submit">Add Service</button>
//             </form>
//             {message && <p>{message}</p>}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddService;