import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const [visibility, setVisibility] = useState(false)
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const [button, setButton] = useState("Save")

    useEffect(() => {
        let passwords = localStorage.getItem('passwords')
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }

    }, [])

    function displayToast(message) {
        toast(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    function successToast() {
        toast.success('Successfully Saved', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }


    const togglePassword = () => {
        setVisibility(!visibility)
    }

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setForm({ ...form, [e.target.name]: e.target.value })
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const saveCredentials = () => {
        if (form.site && form.username && form.password) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem('passwords', JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setForm({ site: "", username: "", password: "" })
            setButton('Save')
            if (button === "Update") {
                displayToast("Updated Successfully")
            } else { successToast() }
        } else {
            displayToast('Input fields are empty!')
        }
    }
    const deleteCredentials = (id) => {
        let userConfirmed = confirm("Are you sure you want to delete?");
        if (userConfirmed) {
            const remainingPassword = passwordArray.filter(item => {
                return item.id !== id;
            })
            setPasswordArray(remainingPassword)
            localStorage.setItem('passwords', JSON.stringify(remainingPassword))
            displayToast("Password Deleted")
        } else { }
    }
    const editCredentials = (id) => {
        setButton('Update')
        const editedPassword = passwordArray.filter(item => {
            return item.id === id;
        })
        editedPassword.map(item => {
            setForm({ site: item.site, username: item.username, password: item.password })
        })
        const remainingPassword = passwordArray.filter(item => {
            return item.id !== id;
        })
        setPasswordArray(remainingPassword)
    }

    const copyCredentials = async (a, b, c) => {
        let text = `${a}\n,${b}\n,${c}`;
        try {
            await navigator.clipboard.writeText(text)
            displayToast("Copied to clipboard")
        } catch (err) {
            displayToast('Failed to copy')
            console.log("Error in copying", err)
        }
    }

    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>

            <div className="w-10/12 xl:w-[1200px] max-w-[1200px] mx-auto bg-purple-400/25 backdrop-blur-2xl rounded-2xl">

                <div className="head flex flex-col gap-2 justify-center items-center my-3">
                    <h1 className='logo font-bold text-2xl md:text-3xl'>
                        <span className='text-purple-700'>&lt;</span>
                        <span>Pass</span>
                        <span className='text-purple-700'>OP/&gt;</span>
                    </h1>
                    <p className='max-md:text-sm'>Your own Password Manager</p>
                </div>

                <div className='flex flex-col items-center gap-2 py-3'>

                    <input type="text" onChange={handleInputChange} value={form.site} name='site' placeholder='Enter Website URL' className='bg-purple-100 w-10/12 rounded-full p-2 outline-none border border-purple-300 focus:border focus:border-purple-700 transition-all' />

                    <div className='input flex flex-col md:flex md:flex-row md:items-center w-10/12 gap-2'>
                        <input type="text" onChange={handleInputChange} value={form.username} maxLength={20} name='username' placeholder='Enter Username' className='bg-purple-100 w-12/12 rounded-full p-2 outline-none border border-purple-300 focus:border focus:border-purple-700 transition-all' />
                        <div className='w-full relative'>
                            <input type={visibility ? 'text' : 'password'} onChange={handleInputChange} maxLength={12} value={form.password} name='password' placeholder='Enter Password' className='bg-purple-100  rounded-full w-full p-2 outline-none border border-purple-300 focus:border focus:border-purple-700 transition-all' />
                            <span onClick={togglePassword} className="material-symbols-outlined absolute right-5 top-2 transition-colors hover:text-purple-700 cursor-pointer">{visibility ? 'visibility_off' : 'visibility'}</span>
                        </div>
                    </div>

                    <div className='flex self-center'>
                        <button onClick={saveCredentials} className='bg-purple-400 outline-none hover:ring-1 hover:ring-black hover:bg-purple-300 transition-all duration-300 ease-in-out flex gap-2 items-center font-semibold rounded-full w-fit px-2 py-1 cursor-pointer'>
                            <lord-icon
                                state="hover-swirl"
                                src="https://cdn.lordicon.com/vjgknpfx.json"
                                trigger="morph"
                                colors="primary:#121331,secondary:#121331"
                            >
                            </lord-icon>
                            {button}
                        </button>
                    </div>

                </div>
                <div className="line w-full border-2 border-purple-500 border-dotted mt-2"></div>

                <div className="displayPasswords w-10/12 mx-auto py-5">
                    <h2 className='text-center text-xl md:text-2xl font-semibold pb-3 underline underline-offset-2'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-center font-semibold text-red-600'>No passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <div className='table-scroll  overflow-x-auto max-md:overflow-x-scroll lg:w-full rounded-xl'>
                            <table className="table-auto min-w-[550px] w-full mx-auto rounded-xl overflow-hidden">
                                <thead className=''>
                                    <tr className='bg-purple-700 text-white max-md:text-sm'>
                                        <th className='py-2'>Website</th>
                                        <th className='py-2 '>Username</th>
                                        <th className='py-2 text-center '>Passwords</th>
                                        <th className=''>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-purple-300/25'>
                                    {passwordArray.map((items, index) => {
                                        return (
                                            <tr key={index} className='text-center max-md:text-sm'>
                                                <td className='py-1 border-b border-purple-400 truncate max-w-[250px]' title={items.site}><a href={items.site} target='_blank' className='block px-2'>{items.site}</a></td>
                                                <td className='py-1 border-b border-purple-400'>{items.username}</td>
                                                <td className='py-1 border-b border-purple-400'>{btoa(items.password)}</td>
                                                <td className=' border-b border-purple-400 space-x-1 flex-nowrap'>

                                                    <span onClick={() => editCredentials(items.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/exymduqj.json"
                                                            trigger="loop-on-hover"
                                                            delay="1000"
                                                            stroke="bold"
                                                            colors="primary:#000000,secondary:#8930e8"
                                                            style={{ "width": "20px", "height": "20px" }}
                                                            title='Edit'
                                                        >
                                                        </lord-icon>
                                                    </span>
                                                    <span onClick={() => deleteCredentials(items.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/jzinekkv.json"
                                                            trigger="loop-on-hover"
                                                            delay="1000"
                                                            stroke="bold"
                                                            colors="primary:#000000,secondary:#e83a30"
                                                            style={{ "width": "20px", "height": "20px" }}
                                                            title='Delete'
                                                        >
                                                        </lord-icon>
                                                    </span>
                                                    <span onClick={() => copyCredentials(items.site, items.username, items.password)} title='Copy to clipboard' className="material-symbols-outlined hover:text-purple-800 cursor-pointer ">content_copy</span>

                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }
                    {/* <div className="cardView overflow-hidden rounded-2xl">
                        <div className='bg-purple-500 px-3 py-1'>
                            <h1 className='text-xl font-semibold'>Website</h1>
                            <p>http://localhost:5173/</p>
                        </div>
                        <div className='bg-purple-300 px-3'>
                        <div className='py-1'>
                            <h2 className='text-md font-semibold'>Username</h2>
                            <p>PassOP</p>
                        </div>
                        <div className='py-1'>
                            <h2 className='text-md font-semibold'>Password</h2>
                            <p>admin aun</p>
                        </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Manager
