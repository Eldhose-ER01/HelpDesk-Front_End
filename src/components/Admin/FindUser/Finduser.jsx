import { useState, useEffect } from "react";
import { adminApi } from "../../Api/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Finduser() {
  const navigate=useNavigate()
  const [user, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalpages] = useState(0);
  const [search, setSearch] = useState("");

const handleClick=(index)=>{
  setUsers(index+1)
}

  const findUsers = async () => {
    try {
      const response = await axios.get(`${adminApi}/finduser/?page=${page}&search=${search}`)
      if (response.data.success) {
        setUsers(response.data.users);
        setTotalpages(response.data.totalpages);
        setPage(response.data.page);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bolockorunblock = async (id) => {
    try {
        const response = await axios.put(`${adminApi}/blockuser/?id=${id}`);
      if (response.data.success) {
        setUsers(response.data.userdata);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteUser = async (id) => {
    try {
        const response = await axios.put(`${adminApi}/deleteuser/?id=${id}`);
      if (response.data.success) {
        toast.success("User Deleted")
        setUsers(response.data.userdata);
      }
    } catch (error) {
      console.log(error);
    }
  };
const loginuser=()=>{
    navigate('/signup')
}
  useEffect(() => {
    findUsers();
  }, [page, search]);

  return (
    <div>
      <div className=" mt-5 flex  flex-col">
        <h1 className="font-extrabold font-serif flex justify-center text-3xl ">
          User List
        </h1>
        <div className="flex justify-between">
        <div>
          <input
            className="h-10 w-52 ml-3 mt-5 bg-slate-200 border border-green-400 pl-1 rounded-md"
            type="text"
            name="search"
            placeholder="Search Name here.."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div>
<button className="bg-black text-green-400 font-semibold w-40 h-12 rounded-sm mr-4"onClick={loginuser}>Create New Ones </button>
        </div>
        </div>
       
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        Email
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3  text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3  text-xs font-bold text-left text-gray-800 uppercase "
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {user.length >= 0 &&
                      user.map((user, index) => {
                        return (
                          <tr key={user._id}>
                            <td className="px-6 py-4 text-bold text-left font-medium text-gray-800 whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 font-bold text-gray-800 text-left whitespace-nowrap">
                              {user.username}
                            </td>
                            <td className="px-6 py-4 font-bold text-gray-800 text-left whitespace-nowrap">
                              {user.email}
                            </td>
                            

                            <td className="px-6 py-4  text-left whitespace-nowrap">
                              {user.status ? (
                                <button
                                  type="button"
                                  className=" w-[100px] text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                  onClick={() => {
                                    bolockorunblock(user._id);
                                  }}
                                >
                                  Block
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className=" w-[100px] mtext-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                                  onClick={() => {
                                    bolockorunblock(user._id);
                                  }}
                                >
                                  Unblock
                                </button>
                              )}
                            </td>
                            <td>
                                <button className="h-12 w-28 bg-red-800 rounded-sm text-white font-bold hover:bg-black"
                                onClick={()=>DeleteUser(user._id)}>Delete</button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="max-w-[1600px] bg-gray-100 flex justify-center mt-3">
                {totalPages > 0 &&
                  [...Array(totalPages)].map((val, index) => (
                    <button
                      className={`${
                        page === index + 1 ? "bg-black" : "bg-black"
                      } py-2 px-4 rounded-md m-1 text-white ${
                        page === index + 1 ? "font-bold" : "font-normal"
                      } focus:outline-none focus:ring focus:ring-offset-2`}
                      key={index}
                      onClick={() => handleClick(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
