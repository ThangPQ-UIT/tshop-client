import BannerComponent from './Banner_Components/banner'

import bannerData from './bannerData'

import './style.css'

const Banner = () => {

    const bannerLength = bannerData.length

    return (
        <>
            <div id='banner-container' className='p-0'>
                {bannerData.map((banner, index) =>
                    <BannerComponent
                        key={banner.id}
                        index={index + 1}
                        url={banner.url}
                        title={banner.title}
                        length={bannerLength}
                        description={banner.description}
                        collectionName={banner.collectionName}
                    />
                )}
            </div>
        </>
    )
}

export default Banner