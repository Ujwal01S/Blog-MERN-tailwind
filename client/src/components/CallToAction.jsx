import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2>Want to learn more about content</h2>
        <p>Checkout these resouces in the google</p>
        <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'
        outline>
            <a 
            target='_blank'
            href = 'https://www.google.com'
            rel='noopener noreferrer'
            >
            Google
            </a>
        </Button>
    </div>
    <div className="p-7 flex-1">
        <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
      </div>
    </div>
  )
}

export default CallToAction