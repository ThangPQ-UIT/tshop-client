import React from 'react'

const ContactInformation = ({ icon, name, information }) => {
    return (
        <div className='d-flex mb-4 align-items-center'>
            <div className='mr-3'>
                <img src={icon} alt='infomation icon' width='30px' height='50px' />
            </div>
            <div>
                <p className='m-0 text-capitalize'>{name}</p>
                <p className='m-0 text-capitalize'>{information}</p>
            </div>
        </div>
    )
}

export default ContactInformation