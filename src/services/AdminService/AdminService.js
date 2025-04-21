// AdminService.js

import axios from 'axios';

export default class AdminService {
    static async signin(username, password) {
        try {
        const response = await axios.post('http://localhost:3000/admin/signin', {
            username,
            password,
        });
        return response.data;
        } catch (error) {
        return error.response.data;
        }
    }
    }

//   <div className="text-center mt-3">
//     <button type="submit" className="btn btn-lg btn-primary">Sign in</button>
//   </div>
