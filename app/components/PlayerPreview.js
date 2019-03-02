import React from 'react'
import PropTypes from 'prop-types'

function PlayerPreview(props) {
  return (
    <div>
        <div className="column">
            <img className='avatar' src={props.avatar} alt={'user avatar' + props.username}/>
            <h2>@{props.username}</h2>
        </div>
        {props.children}
    </div>
  )
}

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
}

export default PlayerPreview

