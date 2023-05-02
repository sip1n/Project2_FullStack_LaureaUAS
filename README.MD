# Multichannel Messaging App 

This is a **multichannel messaging application** that enables users to communicate through different channels.

---

### Technologies Used

The following **technologies** were used to develop this application:

| **Node.js** | **Express** | **MongoDB** | **Mongoose** | **bcrypt** | **jsonwebtoken** | **Dotenv** | **cookie-parser** |

---

### Getting Started

To get started with the application, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using ``npm install``.
3. Set up your environment variables by creating a `.env` file in the root directory of the project and adding your configuration values.
```
MONGODB_URI=mongodb+srv://<username>:<password>@<your_mongoDB_cluster>
JWT_SECRET=<YOUR_SECRET>
```
4. Start the server using ``npm start``.

---

### TODO

- [x] Signup and login
- [x] Password hashing (bcrypt)
- [x] Authorization token (jsonwebtoken)
- [ ] Implement refresh token 
- [x] Get all channels
- [x] Create channel
- [x] Edit channel
- [x] Delete channel
- [ ] Join channel
- [ ] Leave channel
- [ ] Send message to channel
- [ ] Edit message
- [ ] Delete message
- [ ] Input validation
- [ ] Chill and drink sihijuoma

---

### License

This project is licensed under the **ISC License** - see [`https://www.isc.org/licenses/`](https://www.isc.org/licenses/) for more info about licence.

--- 

Project made by Eetu Siponen
