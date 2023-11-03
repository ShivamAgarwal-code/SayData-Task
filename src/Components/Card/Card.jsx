import React from 'react'
import './style.css'
function Card(props) { {/*props is used to map attributes of card component */}
  return (
    <div className="card-item">
    <div className="card-icon">
        {props.svg}
    </div>
    <div className="cardText">
        <h6 className="cardContent">{props.content}</h6>
        <span className="cardTextFooter">{props.text}</span>
    </div>
</div>
  )
}

export default Card
