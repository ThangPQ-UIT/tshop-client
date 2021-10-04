import menImg from 'assets/images/product_men.jpeg'
import womenImg from 'assets/images/product_women.jpeg'
import accessoryImg from 'assets/images/product_accessory.jpeg'

export default [
    {
        id: 1,
        name: 'men',
        img: menImg,
        linkTo: 'shop/men',
        description: 'summer 2021',
    },
    {
        id: 2,
        name: 'women',
        img: womenImg,
        linkTo: 'shop/women',
        description: 'summer 2021',
    },
    {
        id: 3,
        name: 'accessories',
        img: accessoryImg,
        linkTo: 'shop/accessories',
        description: 'new trend',
    }
]