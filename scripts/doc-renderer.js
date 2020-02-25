import React from 'react'
import SiteRenderer from 'react-site-renderer'

export default ({ docs }) => {
  return (
    <SiteRenderer
      logo={
        <img
          style={{ height: 46 }}
          src="//img.alicdn.com/tfs/TB1U7s3wXY7gK0jSZKzXXaikpXa-380-196.png"
        />
      }
      docs={docs}
    />
  )
}
