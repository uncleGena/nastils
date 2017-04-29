import React           from 'react'
// import jQuery          from 'jquery'
import Materialize     from 'materialize-css/dist/js/materialize'

import Nav      from './Nav.jsx'
import Content  from './Content.jsx'
import Footer   from './Footer.jsx'

export default class Nails extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <Content />
        <Footer />
      </div>
    )
  }
}
