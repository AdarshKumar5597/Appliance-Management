import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div>
        <h2>Not Found</h2>
        <p>Sorry! the page which you are looking for does not exist.</p>
        <Link href="/">Home Page</Link>
    </div>
  )
}

export default NotFound