import React from 'react'
import "./info.css"
import NavBar from '../Navbar/NavBar.tsx'
import { useNavigate } from 'react-router-dom';

const InformationPage = () => {
  const navigate = useNavigate();
  return (
    <div className="main11">
      <NavBar/>
      <div className="contenttt">
        <div className="title">
          <span>Information</span>
          <button onClick={() => navigate("/voting")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13.1571 13.3281H7.81706C6.27142 13.33 4.78961 13.9448 3.69667 15.0377C2.60374 16.1307 1.98891 17.6125 1.98706 19.1581V20.9381C1.98706 21.0707 2.03974 21.1979 2.13351 21.2917C2.22728 21.3854 2.35445 21.4381 2.48706 21.4381H18.4871C18.6197 21.4381 18.7468 21.3854 18.8406 21.2917C18.9344 21.1979 18.9871 21.0707 18.9871 20.9381V19.1581C18.9855 17.6124 18.3707 16.1304 17.2777 15.0374C16.1847 13.9445 14.7028 13.3297 13.1571 13.3281Z" fill="white"/>
              <path d="M10.4871 11.4385C12.9723 11.4385 14.9871 9.42376 14.9871 6.93848C14.9871 4.4532 12.9723 2.43848 10.4871 2.43848C8.00178 2.43848 5.98706 4.4532 5.98706 6.93848C5.98706 9.42376 8.00178 11.4385 10.4871 11.4385Z" fill="white"/>
              <path d="M21 10H19.5V8.5C19.5 8.23478 19.3946 7.98043 19.2071 7.79289C19.0196 7.60536 18.7652 7.5 18.5 7.5C18.2348 7.5 17.9804 7.60536 17.7929 7.79289C17.6054 7.98043 17.5 8.23478 17.5 8.5V10H16C15.7348 10 15.4804 10.1054 15.2929 10.2929C15.1054 10.4804 15 10.7348 15 11C15 11.2652 15.1054 11.5196 15.2929 11.7071C15.4804 11.8946 15.7348 12 16 12H17.5V13.5C17.5 13.7652 17.6054 14.0196 17.7929 14.2071C17.9804 14.3946 18.2348 14.5 18.5 14.5C18.7652 14.5 19.0196 14.3946 19.2071 14.2071C19.3946 14.0196 19.5 13.7652 19.5 13.5V12H21C21.2652 12 21.5196 11.8946 21.7071 11.7071C21.8946 11.5196 22 11.2652 22 11C22 10.7348 21.8946 10.4804 21.7071 10.2929C21.5196 10.1054 21.2652 10 21 10Z" fill="white"/>
            </svg>
            <span>Vote now</span></button>
        </div>
        <div className="bottom-content">
          <span>Welcome, Gagan</span>
          <div className="bottom-ct">
            <span>Here are few guidelines</span>
            <p className="bottom-ctp">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
          <div className="bottom-ct">
            <span>Here are few guidelines</span>
            <p className="bottom-ctp">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InformationPage