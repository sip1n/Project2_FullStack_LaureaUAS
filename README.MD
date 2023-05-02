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
PORT=<YOUR_PORT>
```
4. Start the server using ``npm start``.
5. In console you should see if server has started and if it has connected to MongoDB.
```
Server started on port <YOUR_PORT>
Connected to MongoDB
```

---

### Using Routes

1. Guide on using routes coming *here*

Routes currently in developemental working state

**/api/users/signup**

POST 

Input:

```
{
  "email": "your.email@email.com",
  "password": "your_password"
}
```
Output:

*Successful registration*
```
{
    "message": "User created successfully"
}
```
*If user has been created with given email*
```
{
    "message": "Email already in use"
}
```

**/api/users/login**

POST 

Input:
```
{
  "email": "your.email@email.com",
  "password": "your_password"
}
```

Output:

*Login with right credentials*
```
{
    "message": "Login successful",
    "token": "<YOUR_GENERATED_JWT_TOKEN>"
}
```
with cookie 
```
token=<YOUR_GENERATED_JWT_TOKEN>; Path=/; Secure; HttpOnly;
```

*Login with wrong credentials*
```
{
    "message": "Invalid email or password"
}
```

/api/users/me

**GET**

JWT token needs to be sent in header key ``Authorization`` with value ``<YOUR_JWT_TOKEN>``

Output:
*If JWT token is authorized*
```
{
    "user": {
        "_id": "<YOUR_UNIQUE_USER_ID>",
        "email": "your.email@email.com",
        "password": "<YOUR_BCRYPT_HASHED_PASSWORD>",
        "channels": [
            "<FIRST_UNIQUE_CHANNEL_ID_ON_ARRAY>",
            ...

            ...
            "<LAST_UNIQUE_CHANNEL_ID_ON_ARRAY>"
        ],
        "__v": 0
    }
}
```

/api/channel

**GET**
Get all channels that have been created from MongoDB /channels/ collection

**Authorized**

Output:

*Login with right credentials*
```
{
    "channels": [
        {
            "_id": "<FIRST_UNIQUE_CHANNEL_ID_ON_ARRAY>",
            "name": "Example channel 1",
            "description": "this is a test description for a test channel",
            "created_by": "<UNIQUE_USER_ID>",
            "members": [
                "<UNIQUE_USER_ID>"
            ],
            "created_at": "2023-05-02T13:02:29.093Z",
            "__v": 0
        },
        {
            "_id": "<LAST_UNIQUE_CHANNEL_ID_ON_ARRAY>",
            "name": "Example channe 2",
            "description": "this is a test description for a test channel",
            "created_by": "<UNIQUE_USER_ID>",
            "members": [
                "<UNIQUE_USER_ID>"
            ],
            "created_at": "2023-05-02T13:02:35.839Z",
            "__v": 0
        }
    ]
}
```

**POST**
Create new channel



*Authorized*

Input:
```
{
  "name": "<YOUR_CHANNEL_NAME>",
  "description": "<YOUR_CHANNEL_DESCRIPTION>" 
}
```

Output:

```
{
    "message": "Channel created",
    "channel": {
        "name": "<YOUR_CHANNEL_NAME>",
        "description": "<YOUR_CHANNEL_DESCRIPTION>",
        "created_by": "<UNIQUE_USER_ID>",
        "members": [
            "<UNIQUE_USER_ID>"
        ],
        "_id": "<UNIQUE_CHANNEL_ID>",
        "created_at": "2023-05-02T13:02:35.839Z",
        "__v": 0
    }
}
```

/api/channel/:id

**GET**
Get channel info based on `<UNIQUE_CHANNEL_ID>`

**Authorized**

*If channel id does not exist*
```
{
  "message": "Channel not found" 
}
```

*If channel exists*
```
{
    "channel": {
        "name": "<YOUR_CHANNEL_NAME>",
        "description": "<YOUR_CHANNEL_DESCRIPTION>",
        "created_by": "<UNIQUE_USER_ID>",
        "members": [
            "<UNIQUE_USER_ID>"
        ],
        "_id": "<UNIQUE_CHANNEL_ID>",
        "created_at": "2023-05-02T13:02:35.839Z",
        "__v": 0
    }
}
```

**PUT**

Update channel name or description. To be authorized to do this user needs to "owner" of channel = `"created_by": "<UNIQUE_USER_ID>"`

**Authorized**

Input:

*You can input only `name` or `description` or both with same query*
```
{
  "name": "<UPDATED_CHANNEL_NAME>"
  "description": "<UPDATED_CHANNEL_DESCRIPTION>"
}
```

Output:

```
{
    "message": "Channel updated",
    "channel": {
        "_id": "<UNIQUE_CHANNEL_ID>",
        "name": "<UPDATED_CHANNEL_NAME>",
        "description": "<UPDATED_CHANNEL_DESCRIPTION>",
        "created_by": "<UNIQUE_USER_ID>",
        "members": [
            "<UNIQUE_USER_ID>"
        ],
        "created_at": "2023-05-02T13:02:29.093Z",
        "__v": 0
    }
}
```

**DELETE**

Delete channel. To be authorized to do this user needs to "owner" of channel = `"created_by": "<UNIQUE_USER_ID>"`

*Authorized*

Output:

*Channel exists*
```
{
    "message": "Channel deleted"
}
```

*Channel doesn't exist*
```
{
    "message": "Channel not found"
}
```

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
