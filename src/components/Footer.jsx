import React from 'react'

const Footer = () => {
    return (
        <div className='flex justify-around items-center bg-purple-200 py-2'>
            <div className='logo font-bold text-xl'>
                <span className='text-purple-700'>&lt;</span>
                <span>Pass</span>
                <span className='text-purple-700'>OP/&gt;</span>
            </div>
            <div className='flex items-center italic'>
                Created With
                <lord-icon
                    src="https://cdn.lordicon.com/jpuldrhu.json"
                    trigger="loop"
                    delay="1000"
                    stroke="bold"
                    colors="primary:#8930e8,secondary:#e83a30"
                    >
                </lord-icon>
                By M Aun R
            </div>
        </div>
    )
}

export default Footer


{/* <lord-icon
    src="https://cdn.lordicon.com/exymduqj.json"
    trigger="loop-on-hover"
    delay="1000"
    state="in-dynamic"
    colors="primary:#000000,secondary:#8930e8"
    style="width:250px;height:250px">
</lord-icon> */}

{/* <span class="material-symbols-outlined">content_copy</span> */}