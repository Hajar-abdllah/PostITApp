import {UserData} from "../ExampleData";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config.js";


//const initialState ={value:UserData}; 
const initialState = {
    users: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  };
  
export const registerUser = createAsyncThunk("users/registerUser",
        async (userData)=>{
            try{
                const response = await axios.post(`${ENV.SERVER_URL}/registerUser`,
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                  });
                  console.log(response);
                  const user = response.data.user;
                  return user; 
            }
            catch (error) {
              console.log(error);
            }
        
});
export const login = createAsyncThunk("users/login", async (userData) => {
  try {
      const response = await axios.post(`${ENV.SERVER_URL}/login`, {
          email: userData.email,
          password: userData.password,
      });

      return response.data.user; // Return the user object
  } catch (error) {
      const errorMessage = "Invalid credentials";
      alert(errorMessage);
      throw new Error(errorMessage);
  }
});
export const logout = createAsyncThunk("/users/logout", async () => {
  try {
    // Send a request to your server to log the user out
    const response = await axios.post(`${ENV.SERVER_URL}/logout`);
  } catch (error) {}
});
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile", // Action type string for Redux
  async (userData) => {
    try {
      // Log the user data being sent for debugging purposes
      // console.log(userData);

      // Send a PUT request to the server to update the user profile
      const response = await axios.put(
        `${ENV.SERVER_URL}/updateUserProfile/${userData.email}`, // API endpoint for updating user profile
        {
          // Request payload with user data to be updated
          email: userData.email,
          name: userData.name,
          password: userData.password,
          profilePic: userData.profilePic,
        },
        {
          headers: {  //headers is necessary when uploading files with form-data in a request.
            "Content-Type": "multipart/form-data", 
          },
        }
      );

      // Extract the updated user data from the server response
      const user = response.data.user;

      // Return the updated user data, which will be used by Redux to update the state
      return user;
    } catch (error) {
      // Log any errors that occur during the request
      console.log(error);
    }
  }
);



 const userSlice = createSlice({
     name: "users", 
    initialState,

    reducers: {
               
    addUser: (state, action) => {
        state.value.push(action.payload);
    },
    deleteUser: (state, action) =>{
        state.value=state.value.filter((user)=>user.email!==action.payload)
    },
    updateUser: (state, action) => {
      state.value.map((user) => {
        //iterate the  array and compare the email with the email from the payload
        if (user.email === action.payload.email) {
          user.name = action.payload.name;
          user.password = action.payload.password;
        }
      });
    },},

    extraReducers: (builder) => {
        //Asynchronous actions that update the state directly,
        builder
          .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = true;
          
          })
          .addCase(registerUser.rejected, (state) => {
            state.isLoading = false;
          })

          .addCase(login.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.users = action.payload; //assign the payload which is the user object return from the server after authentication
            state.isLoading = false;
            state.isSuccess = true;
          })
          .addCase(login.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
          })
      
          .addCase(logout.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(logout.fulfilled, (state) => {
            state.user = {};
            state.isLoading = false;
            state.isSuccess = false;
          })
          .addCase(logout.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
          })
          .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    
    },
  
    
    
    

});

export const{addUser,deleteUser,updateUser} =userSlice.actions;
export default userSlice.reducer;
    
