import React from 'react'

const CollectionBlock = ({ name, title, btn, description, imgBackground }) => {
    return (
        <div className='position-relative p-lg-5 p-3 borders'>
            <img src={imgBackground} alt='collection img' className='border' style={{
                position: 'absolute',
                top: 0,
                right: 0,
                objectFit: 'fill',
                zIndex: '0',
                height: '100%',
                width: '100%',
            }} />
            <div className='w-lg-50 w-75 border' style={{
                zIndex: '1',
                position: 'relative'
            }}>
                <p className='text-uppercase' style={{
                    color: '#807755bf',
                    textTransform: 'uppercase',
                    fontSize: '0.9rem'
                }}>{name}</p>
                <p style={{
                    fontSize: '3rem',
                    fontFamily: 'antic-didon',
                    marginBottom: '30px',
                }}>{title}</p>
                <p style={{
                    marginBottom: '80px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    color: '#807755bf',
                    whiteSpace: 'pre-line'
                }}>{description}</p>
                <button className='text-uppercase' style={{
                    backgroundColor: btn.btnBackground,
                    padding: '12px 25px',
                    fontSize: '1rem',
                    fontWeight: 'bolder',
                    border: btn.border,
                    color: btn.color
                }}>{btn.btnName}</button>
            </div>
        </div>
    )
}

export default CollectionBlock 