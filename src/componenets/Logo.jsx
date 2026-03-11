import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div>
        <img src="https://commons.wikimedia.org/wiki/File:Reddit_wordmark.svg" alt="" width={{width}}/>
    </div>
  )
}

export default Logo